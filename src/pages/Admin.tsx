import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addUploadsToStorage,
  extractUploadWidgetInfos,
  fetchCloudinaryResourcesByTag,
  fetchCloudinaryResourcesByTagWithRetry,
  loadUploadsFromStorage,
  mergeCloudinaryAndStored,
  normalizeCloudinaryList,
  normalizeCloudinaryResource,
  removeUploadFromStorage,
  storedUploadToResource,
  type CloudinaryListResource,
  type StoredUpload,
} from "@/utils/cloudinary";

type CloudinaryResource = CloudinaryListResource;

declare global {
  interface Window {
    cloudinary?: any;
  }
}

const ADMIN_PASSWORD = "alsahal-admin"; // <-- Change this password string

const CLOUDINARY_WIDGET_SCRIPT_SRC =
  "https://upload-widget.cloudinary.com/global/all.js";

const CLOUDINARY_TAGS = {
  // Gallery images
  galleryGlassInstallations: "alsahal_gallery_glass_installations",
  highlightSofa: "alsahal_gallery_highlight_sofa_deep_cleaning",
  highlightCarpet: "alsahal_gallery_highlight_carpet_deep_cleaning",
  highlightMattress: "alsahal_gallery_highlight_mattress_sanitisation",

  // Before/After images
  baAcDuctBefore: "alsahal_ba_ac_duct_before",
  baAcDuctAfter: "alsahal_ba_ac_duct_after",
  baAcGrillBefore: "alsahal_ba_ac_grill_before",
  baAcGrillAfter: "alsahal_ba_ac_grill_after",
  baVentGrillBefore: "alsahal_ba_vent_grill_before",
  baVentGrillAfter: "alsahal_ba_vent_grill_after",
  baCentralDuctBefore: "alsahal_ba_central_duct_before",
  baCentralDuctAfter: "alsahal_ba_central_duct_after",
  baTrunkDuctBefore: "alsahal_ba_trunk_duct_before",
  baTrunkDuctAfter: "alsahal_ba_trunk_duct_after",
  baCleaningMachineBefore: "alsahal_ba_cleaning_machine_before",
  baCleaningMachineAfter: "alsahal_ba_cleaning_machine_after",

  // Videos
  videoCurtainSteam: "alsahal_video_curtain_steam",
  videoAcFilterCleaning: "alsahal_video_ac_filter_cleaning",
  videoMattressCleaning: "alsahal_video_mattress_cleaning",
  videoGlassInstallationProcess: "alsahal_video_glass_installation_process",
  videoShowreel: "alsahal_video_alsahal_showreel",
} as const;

const ALL_TAG_CONFIGS: Array<{ resourceType: "image" | "video"; tag: string }> = [
  { resourceType: "image", tag: CLOUDINARY_TAGS.galleryGlassInstallations },
  { resourceType: "image", tag: CLOUDINARY_TAGS.highlightSofa },
  { resourceType: "image", tag: CLOUDINARY_TAGS.highlightCarpet },
  { resourceType: "image", tag: CLOUDINARY_TAGS.highlightMattress },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baAcDuctBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baAcDuctAfter },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baAcGrillBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baAcGrillAfter },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baVentGrillBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baVentGrillAfter },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baCentralDuctBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baCentralDuctAfter },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baTrunkDuctBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baTrunkDuctAfter },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baCleaningMachineBefore },
  { resourceType: "image", tag: CLOUDINARY_TAGS.baCleaningMachineAfter },
  { resourceType: "video", tag: CLOUDINARY_TAGS.videoCurtainSteam },
  { resourceType: "video", tag: CLOUDINARY_TAGS.videoAcFilterCleaning },
  { resourceType: "video", tag: CLOUDINARY_TAGS.videoMattressCleaning },
  { resourceType: "video", tag: CLOUDINARY_TAGS.videoGlassInstallationProcess },
  { resourceType: "video", tag: CLOUDINARY_TAGS.videoShowreel },
];

const STORAGE_KEYS = {
  adminSession: "alsahal_admin_session",
  deleteTokens: "alsahal_cloudinary_delete_tokens_v1",
} as const;

type DeleteTokenStore = Record<
  string,
  {
    token: string;
    storedAt: number;
  }
>;

const getDeleteTokenStorageKey = (resourceType: string, publicId: string) =>
  `${resourceType}:${publicId}`;

const Admin = () => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as
    | string
    | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as
    | string
    | undefined;

  const [authed, setAuthed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(STORAGE_KEYS.adminSession) === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"gallery" | "beforeAfter" | "videos">("gallery");

  const [deleteTokens, setDeleteTokens] = useState<DeleteTokenStore>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.deleteTokens);
      return raw ? (JSON.parse(raw) as DeleteTokenStore) : {};
    } catch {
      return {};
    }
  });

  const [tagResources, setTagResources] = useState<Record<string, CloudinaryResource[]>>(
    {}
  );
  const [widgetReady, setWidgetReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.cloudinary?.createUploadWidget)
  );

  const tagKey = (resourceType: "image" | "video", tag: string) =>
    `${resourceType}:${tag}`;

  const loadStoredUploadsIntoState = useCallback(() => {
    if (!cloudName) return;
    setTagResources((prev) => {
      const next = { ...prev };
      for (const { resourceType, tag } of ALL_TAG_CONFIGS) {
        const key = tagKey(resourceType, tag);
        const stored = loadUploadsFromStorage(tag).map(storedUploadToResource);
        const normalized = normalizeCloudinaryList(cloudName, resourceType, stored);
        const byId = new Map((next[key] ?? []).map((r) => [r.public_id, r]));
        for (const r of normalized) {
          if (r.public_id && r.secure_url) byId.set(r.public_id, r);
        }
        next[key] = Array.from(byId.values());
      }
      return next;
    });
  }, [cloudName]);

  const mergeResourcesIntoTag = (
    resourceType: "image" | "video",
    tag: string,
    incoming: CloudinaryResource[]
  ) => {
    if (!cloudName || incoming.length === 0) return;
    const key = tagKey(resourceType, tag);
    setTagResources((prev) => {
      const existing = prev[key] ?? [];
      const byId = new Map(existing.map((r) => [r.public_id, r]));
      for (const raw of incoming) {
        const normalized = normalizeCloudinaryResource(cloudName, resourceType, raw);
        if (normalized.public_id && normalized.secure_url) {
          byId.set(normalized.public_id, normalized);
        }
      }
      return { ...prev, [key]: Array.from(byId.values()) };
    });
  };

  const refreshTag = useCallback(
    async (
      resourceType: "image" | "video",
      tag: string,
      options?: { withRetry?: boolean }
    ) => {
      if (!cloudName) {
        console.warn("[Admin] refreshTag skipped: missing cloud name");
        return [];
      }

      const key = tagKey(resourceType, tag);
      const fetched = options?.withRetry
        ? await fetchCloudinaryResourcesByTagWithRetry(cloudName, resourceType, tag, {
            logContext: "Admin",
            retries: 3,
            delayMs: 2000,
          })
        : await fetchCloudinaryResourcesByTag(cloudName, resourceType, tag, "Admin");
      const resources = mergeCloudinaryAndStored(cloudName, resourceType, tag, fetched);

      setTagResources((prev) => ({ ...prev, [key]: resources }));
      return resources;
    },
    [cloudName]
  );

  const refreshGalleryTab = useCallback(async () => {
    if (!cloudName) return;
    await Promise.all([
      refreshTag("image", CLOUDINARY_TAGS.galleryGlassInstallations, { withRetry: true }),
      refreshTag("image", CLOUDINARY_TAGS.highlightSofa, { withRetry: true }),
      refreshTag("image", CLOUDINARY_TAGS.highlightCarpet, { withRetry: true }),
      refreshTag("image", CLOUDINARY_TAGS.highlightMattress, { withRetry: true }),
    ]);
  }, [cloudName, refreshTag]);

  const refreshBeforeAfterTab = useCallback(async () => {
    if (!cloudName) return;
    const tags = [
      CLOUDINARY_TAGS.baAcDuctBefore,
      CLOUDINARY_TAGS.baAcDuctAfter,
      CLOUDINARY_TAGS.baAcGrillBefore,
      CLOUDINARY_TAGS.baAcGrillAfter,
      CLOUDINARY_TAGS.baVentGrillBefore,
      CLOUDINARY_TAGS.baVentGrillAfter,
      CLOUDINARY_TAGS.baCentralDuctBefore,
      CLOUDINARY_TAGS.baCentralDuctAfter,
      CLOUDINARY_TAGS.baTrunkDuctBefore,
      CLOUDINARY_TAGS.baTrunkDuctAfter,
      CLOUDINARY_TAGS.baCleaningMachineBefore,
      CLOUDINARY_TAGS.baCleaningMachineAfter,
    ];
    await Promise.all(tags.map((t) => refreshTag("image", t, { withRetry: true })));
  }, [cloudName, refreshTag]);

  const refreshVideosTab = useCallback(async () => {
    if (!cloudName) return;
    const tags = [
      CLOUDINARY_TAGS.videoCurtainSteam,
      CLOUDINARY_TAGS.videoAcFilterCleaning,
      CLOUDINARY_TAGS.videoMattressCleaning,
      CLOUDINARY_TAGS.videoGlassInstallationProcess,
      CLOUDINARY_TAGS.videoShowreel,
    ];
    await Promise.all(tags.map((t) => refreshTag("video", t, { withRetry: true })));
  }, [cloudName, refreshTag]);

  const refreshAll = useCallback(async () => {
    if (!cloudName) return;
    await Promise.all([
      refreshGalleryTab(),
      refreshBeforeAfterTab(),
      refreshVideosTab(),
    ]);
  }, [cloudName, refreshGalleryTab, refreshBeforeAfterTab, refreshVideosTab]);

  useEffect(() => {
    const markReady = () => {
      if (window.cloudinary?.createUploadWidget) {
        setWidgetReady(true);
        console.log("Cloudinary widget ready");
      }
    };

    if (window.cloudinary?.createUploadWidget) {
      markReady();
      return;
    }

    let script = document.querySelector(
      `script[src="${CLOUDINARY_WIDGET_SCRIPT_SRC}"]`
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.src = CLOUDINARY_WIDGET_SCRIPT_SRC;
      script.async = true;
      script.onload = markReady;
      script.onerror = () => {
        console.error(
          "[Admin] Failed to load Cloudinary upload widget script:",
          CLOUDINARY_WIDGET_SCRIPT_SRC
        );
      };
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", markReady);
      if (window.cloudinary?.createUploadWidget) markReady();
    }

    return () => {
      script?.removeEventListener("load", markReady);
    };
  }, []);

  useEffect(() => {
    if (!authed) return;
    loadStoredUploadsIntoState();
    refreshAll().catch((err) => {
      console.error("[Admin] initial refresh failed", err);
    });
  }, [authed, loadStoredUploadsIntoState, refreshAll]);

  const updateDeleteTokensStorage = (next: DeleteTokenStore) => {
    setDeleteTokens(next);
    try {
      localStorage.setItem(STORAGE_KEYS.deleteTokens, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const canUpload = Boolean(cloudName && uploadPreset);

  const openUploadWidget = (opts: {
    resourceType: "image" | "video";
    tag: string;
    multiple?: boolean;
  }) => {
    if (!cloudName || !uploadPreset) return;
    if (!widgetReady || !window.cloudinary?.createUploadWidget) return;

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        resourceType: opts.resourceType,
        tags: [opts.tag],
        return_delete_token: 1,
        multiple: opts.multiple ?? true,
      },
      (error: any, result: any) => {
        if (error) {
          console.error("[Admin] upload widget error", error);
          return;
        }
        if (!result) return;

        if (result.event === "success") {
          const infos = extractUploadWidgetInfos(result);
          console.log("[Admin] upload success", {
            tag: opts.tag,
            resourceType: opts.resourceType,
            count: infos.length,
            publicIds: infos.map((i) => i.public_id),
          });

          if (cloudName && infos.length > 0) {
            mergeResourcesIntoTag(opts.resourceType, opts.tag, infos);

            const storedUploads: StoredUpload[] = infos
              .map((info) => {
                const normalized = normalizeCloudinaryResource(
                  cloudName,
                  opts.resourceType,
                  info
                );
                if (!normalized.public_id || !normalized.secure_url) return null;
                return {
                  public_id: normalized.public_id,
                  secure_url: normalized.secure_url,
                  tag: opts.tag,
                  version: normalized.version,
                  format: normalized.format,
                  resource_type: opts.resourceType,
                } satisfies StoredUpload;
              })
              .filter((u): u is NonNullable<typeof u> => u !== null);

            if (storedUploads.length > 0) {
              addUploadsToStorage(opts.tag, storedUploads, opts.resourceType);
            }
          }

          setDeleteTokens((prev) => {
            const nextTokens: DeleteTokenStore = { ...prev };
            let didAny = false;
            for (const info of infos) {
              const publicId = info.public_id;
              const deleteToken = (info as { delete_token?: string }).delete_token;
              if (!publicId || !deleteToken) continue;
              const key = getDeleteTokenStorageKey(opts.resourceType, publicId);
              nextTokens[key] = { token: deleteToken, storedAt: Date.now() };
              didAny = true;
            }
            if (didAny) {
              try {
                localStorage.setItem(STORAGE_KEYS.deleteTokens, JSON.stringify(nextTokens));
              } catch {
                // ignore
              }
              return nextTokens;
            }
            return prev;
          });

          void refreshTag(opts.resourceType, opts.tag, { withRetry: true }).catch(
            (err) => console.error("[Admin] post-upload refresh failed", err)
          );
        }

        if (result.event === "queues-end") {
          console.log("[Admin] upload queue finished, refreshing tag", opts.tag);
          void refreshTag(opts.resourceType, opts.tag, { withRetry: true }).catch(
            (err) => console.error("[Admin] queues-end refresh failed", err)
          );
        }
      }
    );

    widget.open();
  };

  const deleteResource = async (
    resourceType: "image" | "video",
    publicId: string,
    tag: string
  ) => {
    removeUploadFromStorage(tag, publicId);

    const listKey = tagKey(resourceType, tag);
    setTagResources((prev) => ({
      ...prev,
      [listKey]: (prev[listKey] ?? []).filter((r) => r.public_id !== publicId),
    }));

    const tokenKey = getDeleteTokenStorageKey(resourceType, publicId);
    const entry = deleteTokens[tokenKey];

    if (entry?.token && window.cloudinary?.delete_by_token) {
      try {
        await window.cloudinary.delete_by_token(entry.token);
        const nextTokens = { ...deleteTokens };
        delete nextTokens[tokenKey];
        updateDeleteTokensStorage(nextTokens);
      } catch (e: unknown) {
        console.error("[Admin] Cloudinary delete failed (removed from local cache)", e);
      }
    }

    if (cloudName) {
      void refreshTag(resourceType, tag).catch((err) =>
        console.error("[Admin] post-delete refresh failed", err)
      );
    }
  };

  const galleryGlassResources = useMemo(
    () => tagResources[`image:${CLOUDINARY_TAGS.galleryGlassInstallations}`] ?? [],
    [tagResources]
  );
  const highlightSofaResources = useMemo(
    () => tagResources[`image:${CLOUDINARY_TAGS.highlightSofa}`] ?? [],
    [tagResources]
  );
  const highlightCarpetResources = useMemo(
    () => tagResources[`image:${CLOUDINARY_TAGS.highlightCarpet}`] ?? [],
    [tagResources]
  );
  const highlightMattressResources = useMemo(
    () => tagResources[`image:${CLOUDINARY_TAGS.highlightMattress}`] ?? [],
    [tagResources]
  );

  const beforeAfterPairs = useMemo(
    () => [
      {
        title: "AC Duct Deep Cleaning",
        beforeTag: CLOUDINARY_TAGS.baAcDuctBefore,
        afterTag: CLOUDINARY_TAGS.baAcDuctAfter,
      },
      {
        title: "AC Grill Cleaning",
        beforeTag: CLOUDINARY_TAGS.baAcGrillBefore,
        afterTag: CLOUDINARY_TAGS.baAcGrillAfter,
      },
      {
        title: "Vent Grill Restoration",
        beforeTag: CLOUDINARY_TAGS.baVentGrillBefore,
        afterTag: CLOUDINARY_TAGS.baVentGrillAfter,
      },
      {
        title: "Central Duct Cleaning",
        beforeTag: CLOUDINARY_TAGS.baCentralDuctBefore,
        afterTag: CLOUDINARY_TAGS.baCentralDuctAfter,
      },
      {
        title: "AC Trunk Duct Cleaning",
        beforeTag: CLOUDINARY_TAGS.baTrunkDuctBefore,
        afterTag: CLOUDINARY_TAGS.baTrunkDuctAfter,
      },
      {
        title: "Cleaning Machine Maintenance",
        beforeTag: CLOUDINARY_TAGS.baCleaningMachineBefore,
        afterTag: CLOUDINARY_TAGS.baCleaningMachineAfter,
      },
    ],
    []
  );

  const videoCategories = useMemo(
    () => [
      {
        title: "Curtain Steam Cleaning",
        tag: CLOUDINARY_TAGS.videoCurtainSteam,
      },
      {
        title: "AC Filter Cleaning",
        tag: CLOUDINARY_TAGS.videoAcFilterCleaning,
      },
      {
        title: "Mattress Deep Cleaning",
        tag: CLOUDINARY_TAGS.videoMattressCleaning,
      },
      {
        title: "Glass & Aluminium Installation Process",
        tag: CLOUDINARY_TAGS.videoGlassInstallationProcess,
      },
      {
        title: "Alsahal Services Showreel",
        tag: CLOUDINARY_TAGS.videoShowreel,
      },
    ],
    []
  );

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md rounded-2xl bg-card border border-border shadow-soft p-6">
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Password-protected access for managing gallery content.
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              if (!password) {
                setError("Password is required.");
                return;
              }
              if (password !== ADMIN_PASSWORD) {
                setError("Invalid password.");
                return;
              }
              sessionStorage.setItem(STORAGE_KEYS.adminSession, "true");
              setAuthed(true);
            }}
          >
            <label className="text-sm font-medium text-foreground">
              Password
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/60"
              />
            </label>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <button
              type="submit"
              className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
              disabled={!canUpload}
              title={!canUpload ? "Set Cloudinary env variables first." : undefined}
            >
              Login
            </button>
            {!canUpload ? (
              <p className="text-xs text-muted-foreground leading-relaxed">
                Missing Cloudinary env vars: `VITE_CLOUDINARY_CLOUD_NAME` and/or `VITE_CLOUDINARY_UPLOAD_PRESET`.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    );
  }

  const MediaThumb = (props: { resourceType: "image" | "video"; res: CloudinaryResource; tag: string }) => {
    const { resourceType, res, tag } = props;

    return (
      <div className="relative group rounded-xl overflow-hidden border border-border bg-background">
        {resourceType === "image" ? (
          res.secure_url ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={res.secure_url}
              className="w-full aspect-square object-cover"
              loading="lazy"
            />
          ) : null
        ) : res.secure_url ? (
          <video
            src={res.secure_url}
            controls
            className="w-full aspect-video object-cover bg-foreground/5"
          />
        ) : null}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={() => deleteResource(resourceType, res.public_id, tag)}
            className="px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold hover:opacity-90"
            title="Remove from gallery (and Cloudinary when delete token is available)"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage gallery images, before/after photos, and service videos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem(STORAGE_KEYS.adminSession);
            setAuthed(false);
            setPassword("");
            setError(null);
          }}
          className="rounded-xl border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("gallery")}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
            activeTab === "gallery" ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"
          }`}
        >
          Gallery
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("beforeAfter")}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
            activeTab === "beforeAfter" ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"
          }`}
        >
          Before/After
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("videos")}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
            activeTab === "videos" ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-muted"
          }`}
        >
          Videos
        </button>
      </div>

      {activeTab === "gallery" ? (
        <div className="space-y-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                refreshGalleryTab().catch((err) =>
                  console.error("[Admin] gallery refresh failed", err)
                );
              }}
              className="rounded-xl border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              Refresh
            </button>
          </div>
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Glass & Aluminium Installations</h2>
            <button
              type="button"
              onClick={() =>
                openUploadWidget({
                  resourceType: "image",
                  tag: CLOUDINARY_TAGS.galleryGlassInstallations,
                })
              }
              className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
              disabled={!canUpload || !widgetReady}
              title={!widgetReady ? "Cloudinary widget not ready yet." : undefined}
            >
              Upload Images
            </button>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
              {galleryGlassResources.map((res) => (
                <MediaThumb
                  key={res.public_id}
                  resourceType="image"
                  res={res}
                  tag={CLOUDINARY_TAGS.galleryGlassInstallations}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Cleaning Highlights</h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Sofa Deep Cleaning</h3>
                <button
                  type="button"
                  onClick={() => openUploadWidget({ resourceType: "image", tag: CLOUDINARY_TAGS.highlightSofa })}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                  disabled={!canUpload || !widgetReady}
                >
                  Upload Sofa Image
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {highlightSofaResources.map((res) => (
                    <MediaThumb key={res.public_id} resourceType="image" res={res} tag={CLOUDINARY_TAGS.highlightSofa} />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Carpet Deep Cleaning</h3>
                <button
                  type="button"
                  onClick={() => openUploadWidget({ resourceType: "image", tag: CLOUDINARY_TAGS.highlightCarpet })}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                  disabled={!canUpload || !widgetReady}
                >
                  Upload Carpet Image
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {highlightCarpetResources.map((res) => (
                    <MediaThumb key={res.public_id} resourceType="image" res={res} tag={CLOUDINARY_TAGS.highlightCarpet} />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Mattress Sanitisation</h3>
                <button
                  type="button"
                  onClick={() => openUploadWidget({ resourceType: "image", tag: CLOUDINARY_TAGS.highlightMattress })}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                  disabled={!canUpload || !widgetReady}
                >
                  Upload Mattress Image
                </button>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {highlightMattressResources.map((res) => (
                    <MediaThumb key={res.public_id} resourceType="image" res={res} tag={CLOUDINARY_TAGS.highlightMattress} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "beforeAfter" ? (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                refreshBeforeAfterTab().catch((err) =>
                  console.error("[Admin] before/after refresh failed", err)
                );
              }}
              className="rounded-xl border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              Refresh
            </button>
          </div>
          {beforeAfterPairs.map((pair) => {
            const beforeKey = `image:${pair.beforeTag}`;
            const afterKey = `image:${pair.afterTag}`;
            const beforeResources = tagResources[beforeKey] ?? [];
            const afterResources = tagResources[afterKey] ?? [];

            return (
              <div key={pair.title} className="space-y-4 rounded-2xl bg-card border border-border p-5">
                <h2 className="text-lg font-bold text-foreground">{pair.title}</h2>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-foreground">Before</h3>
                      <button
                        type="button"
                        onClick={() =>
                          openUploadWidget({ resourceType: "image", tag: pair.beforeTag })
                        }
                        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                        disabled={!canUpload || !widgetReady}
                      >
                        Upload Before
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {beforeResources.map((res) => (
                        <MediaThumb key={res.public_id} resourceType="image" res={res} tag={pair.beforeTag} />
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-foreground">After</h3>
                      <button
                        type="button"
                        onClick={() =>
                          openUploadWidget({ resourceType: "image", tag: pair.afterTag })
                        }
                        className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                        disabled={!canUpload || !widgetReady}
                      >
                        Upload After
                      </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {afterResources.map((res) => (
                        <MediaThumb key={res.public_id} resourceType="image" res={res} tag={pair.afterTag} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {activeTab === "videos" ? (
        <div className="space-y-8">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                refreshVideosTab().catch((err) =>
                  console.error("[Admin] videos refresh failed", err)
                );
              }}
              className="rounded-xl border border-border px-4 py-2 text-foreground hover:bg-muted transition-colors"
            >
              Refresh
            </button>
          </div>
          {videoCategories.map((cat) => {
            const key = `video:${cat.tag}`;
            const resources = tagResources[key] ?? [];

            return (
              <div key={cat.title} className="space-y-4 rounded-2xl bg-card border border-border p-5">
                <h2 className="text-lg font-bold text-foreground">{cat.title}</h2>
                <button
                  type="button"
                  onClick={() => openUploadWidget({ resourceType: "video", tag: cat.tag })}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2 font-semibold hover:scale-[1.01] transition-transform"
                  disabled={!canUpload || !widgetReady}
                >
                  Upload Video
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {resources.map((res) => (
                    <MediaThumb key={res.public_id} resourceType="video" res={res} tag={cat.tag} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Admin;


