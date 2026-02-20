import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SEO from "@/components/SEO";

const blogPosts = [
  {
    id: 1,
    title: "Why Aluminium Frames Are the Best Choice for Modern Windows",
    excerpt:
      "Aluminium offers unmatched durability, sleek aesthetics, and thermal efficiency. Discover why it's the top choice for architects and homeowners.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    date: "February 8, 2026",
    category: "Glass & Aluminium",
  },
  {
    id: 2,
    title: "How to Maintain Your Glass Curtain Wall for Longevity",
    excerpt:
      "Regular maintenance ensures your curtain wall stays pristine and performs optimally. Here are the essential steps every building owner should know.",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop",
    date: "January 30, 2026",
    category: "Maintenance",
  },
  {
    id: 3,
    title: "Frameless Shower Glass: Design Trends for 2026",
    excerpt:
      "Frameless shower enclosures continue to dominate bathroom design. Explore the latest trends in glass thickness, hardware, and finishes.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
    date: "January 20, 2026",
    category: "Design",
  },
  {
    id: 4,
    title: "5 Benefits of Professional Sofa Cleaning",
    excerpt:
      "Discover why regular professional sofa cleaning is essential for maintaining a healthy home environment and extending furniture life.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop",
    date: "January 10, 2026",
    category: "Cleaning Tips",
  },
  {
    id: 5,
    title: "Energy-Efficient Glass: How It Saves You Money",
    excerpt:
      "Low-E glass and double glazing can dramatically reduce energy bills. Learn how Alsahal's solutions help you save while staying comfortable.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    date: "December 28, 2025",
    category: "Glass & Aluminium",
  },
  {
    id: 6,
    title: "AC Duct Cleaning: Why Air Quality Matters",
    excerpt:
      "Dirty AC ducts circulate allergens throughout your space. Learn why professional duct cleaning is essential for healthy indoor air.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop",
    date: "December 15, 2025",
    category: "Cleaning Tips",
  },
];

const Blog = () => {
  return (
    <main>
      <SEO
        title="Blog | Glass & Cleaning Tips | Alsahal UAE"
        description="Expert tips and insights on glass installation, aluminium works, and cleaning services in UAE. Maintenance guides, design trends, and professional advice from Alsahal."
        keywords="glass company UAE, glass installation Dubai, aluminium works UAE, shower glass UAE, glass partitions Dubai, commercial glass UAE, villa glass UAE, cleaning services UAE, deep cleaning Dubai, AC duct cleaning UAE, sofa cleaning Dubai, mattress cleaning UAE, curtain cleaning UAE, carpet cleaning Dubai, filter cleaning UAE, post construction cleaning UAE, office cleaning UAE, Alsahal"
        canonical="/blog"
      />
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-sage">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Blog
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-3">
              Insights & Expert Tips
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
              Expert advice on glass & aluminium solutions, maintenance guides, and cleaning tips from the Alsahal team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col border-border/50 hover:shadow-md transition-shadow">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <header>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="text-primary font-medium">{post.category}</span>
                        <span>•</span>
                        <time>{post.date}</time>
                      </div>
                      <h2 className="font-heading text-xl font-semibold text-foreground leading-tight mb-2">
                        {post.title}
                      </h2>
                    </header>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4">
                      <Button variant="link" className="p-0 h-auto gap-1 text-primary">
                        Read More <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
