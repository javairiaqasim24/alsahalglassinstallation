export type CloudinaryListResource = {
  public_id: string;
  secure_url?: string;
  version?: number;
  format?: string;
  resource_type?: string;
  type?: string;
};

/** List API often omits secure_url; build delivery URL from public_id + version + format. */
export function buildCloudinarySecureUrl(
  cloudName: string,
  resourceType: "image" | "video",
  resource: Pick<CloudinaryListResource, "public_id" | "version" | "format" | "secure_url">
): string | undefined {
  if (resource.secure_url) return resource.secure_url;
  if (!resource.public_id || !cloudName) return undefined;

  const base = `https://res.cloudinary.com/${cloudName}`;
  const publicId = resource.public_id;
  const lastSegment = publicId.split("/").pop() ?? "";
  const hasExtension = /\.[a-z0-9]+$/i.test(lastSegment);

  if (resource.version != null) {
    if (hasExtension) {
      return `${base}/${resourceType}/upload/v${resource.version}/${publicId}`;
    }
    if (resource.format) {
      return `${base}/${resourceType}/upload/v${resource.version}/${publicId}.${resource.format}`;
    }
    return `${base}/${resourceType}/upload/v${resource.version}/${publicId}`;
  }

  if (resource.format && !hasExtension) {
    return `${base}/${resourceType}/upload/${publicId}.${resource.format}`;
  }

  return `${base}/${resourceType}/upload/${publicId}`;
}

export function normalizeCloudinaryResource(
  cloudName: string,
  resourceType: "image" | "video",
  raw: CloudinaryListResource
): CloudinaryListResource {
  const secure_url = buildCloudinarySecureUrl(cloudName, resourceType, raw);
  return { ...raw, secure_url };
}

export function normalizeCloudinaryList(
  cloudName: string,
  resourceType: "image" | "video",
  resources: CloudinaryListResource[]
): CloudinaryListResource[] {
  return resources.map((r) => normalizeCloudinaryResource(cloudName, resourceType, r));
}

export type StoredUpload = {
  public_id: string;
  secure_url: string;
  tag: string;
  resource_type?: "image" | "video";
  version?: number;
  format?: string;
};

export function getUploadsStorageKey(tag: string) {
  return `alsahal_uploads_${tag}`;
}

export function loadUploadsFromStorage(tag: string): StoredUpload[] {
  try {
    const raw = localStorage.getItem(getUploadsStorageKey(tag));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as StoredUpload[]) : [];
  } catch {
    return [];
  }
}

export function saveUploadsToStorage(tag: string, uploads: StoredUpload[]) {
  try {
    localStorage.setItem(getUploadsStorageKey(tag), JSON.stringify(uploads));
  } catch {
    // ignore quota / private mode
  }
}

export function addUploadsToStorage(
  tag: string,
  incoming: StoredUpload[],
  resourceType: "image" | "video"
) {
  const existing = loadUploadsFromStorage(tag);
  const byId = new Map(existing.map((u) => [u.public_id, u]));
  for (const u of incoming) {
    if (!u.public_id || !u.secure_url) continue;
    byId.set(u.public_id, { ...u, tag, resource_type: resourceType });
  }
  saveUploadsToStorage(tag, Array.from(byId.values()));
}

export function removeUploadFromStorage(tag: string, publicId: string) {
  saveUploadsToStorage(
    tag,
    loadUploadsFromStorage(tag).filter((u) => u.public_id !== publicId)
  );
}

export function storedUploadToResource(upload: StoredUpload): CloudinaryListResource {
  return {
    public_id: upload.public_id,
    secure_url: upload.secure_url,
    version: upload.version,
    format: upload.format,
    resource_type: upload.resource_type,
  };
}

export function mergeCloudinaryAndStored(
  cloudName: string,
  resourceType: "image" | "video",
  tag: string,
  fetched: CloudinaryListResource[]
): CloudinaryListResource[] {
  const stored = loadUploadsFromStorage(tag).map(storedUploadToResource);
  const normalizedStored = normalizeCloudinaryList(cloudName, resourceType, stored);
  const normalizedFetched = normalizeCloudinaryList(cloudName, resourceType, fetched);
  const byId = new Map<string, CloudinaryListResource>();
  for (const r of normalizedStored) {
    if (r.public_id && r.secure_url) byId.set(r.public_id, r);
  }
  for (const r of normalizedFetched) {
    if (r.public_id && r.secure_url) byId.set(r.public_id, r);
  }
  return Array.from(byId.values());
}

type TagListFetchResult = {
  resources: CloudinaryListResource[];
  status: number;
};

async function fetchCloudinaryResourcesByTagRaw(
  cloudName: string,
  resourceType: "image" | "video",
  tag: string,
  logContext = "Cloudinary"
): Promise<TagListFetchResult> {
  const url = `https://res.cloudinary.com/${cloudName}/${resourceType}/list/${encodeURIComponent(tag)}.json?_=${Date.now()}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (res.status === 404) {
      return { resources: [], status: 404 };
    }

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.warn(`[${logContext}] list fetch failed`, {
        tag,
        resourceType,
        status: res.status,
        statusText: res.statusText,
        url,
        body: body.slice(0, 200),
      });
      return { resources: [], status: res.status };
    }

    const data = (await res.json()) as { resources?: CloudinaryListResource[] };
    const raw = Array.isArray(data.resources) ? data.resources : [];
    const normalized = normalizeCloudinaryList(cloudName, resourceType, raw);

    console.log(`[${logContext}] list ok`, {
      tag,
      resourceType,
      count: normalized.length,
      sample: normalized[0]?.public_id,
      url,
    });

    return { resources: normalized, status: res.status };
  } catch (err) {
    console.error(`[${logContext}] list fetch error`, { tag, resourceType, err });
    return { resources: [], status: 0 };
  }
}

export async function fetchCloudinaryResourcesByTag(
  cloudName: string,
  resourceType: "image" | "video",
  tag: string,
  logContext = "Cloudinary"
): Promise<CloudinaryListResource[]> {
  const { resources } = await fetchCloudinaryResourcesByTagRaw(
    cloudName,
    resourceType,
    tag,
    logContext
  );
  return resources;
}

export async function fetchCloudinaryResourcesByTagWithRetry(
  cloudName: string,
  resourceType: "image" | "video",
  tag: string,
  options?: { retries?: number; delayMs?: number; logContext?: string }
): Promise<CloudinaryListResource[]> {
  const retries = options?.retries ?? 3;
  const delayMs = options?.delayMs ?? 2000;
  const logContext = options?.logContext ?? "Cloudinary";

  for (let attempt = 1; attempt <= retries; attempt++) {
    const { resources, status } = await fetchCloudinaryResourcesByTagRaw(
      cloudName,
      resourceType,
      tag,
      logContext
    );
    if (status === 404) {
      return [];
    }
    if (resources.length > 0 || attempt === retries) {
      if (resources.length === 0) {
        console.warn(`[${logContext}] list still empty`, {
          tag,
          resourceType,
          attempts: retries,
        });
      }
      return resources;
    }
    console.log(`[${logContext}] list empty, retrying…`, {
      tag,
      resourceType,
      attempt,
      delayMs,
    });
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  return [];
}

/** Parse upload-widget success payload (shape varies for single vs batch). */
export function extractUploadWidgetInfos(result: {
  event?: string;
  info?: unknown;
}): CloudinaryListResource[] {
  const info = result.info as Record<string, unknown> | undefined;
  if (!info) return [];

  if (Array.isArray(info)) {
    return info as CloudinaryListResource[];
  }

  if (typeof info.public_id === "string") {
    return [info as CloudinaryListResource];
  }

  const files = info.files;
  if (Array.isArray(files)) {
    return files
      .map((file) => {
        const f = file as Record<string, unknown>;
        return (f.uploadInfo ?? f) as CloudinaryListResource;
      })
      .filter((f) => Boolean(f.public_id));
  }

  return [];
}
