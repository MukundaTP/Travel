import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({
      hostname: "https://www.chaithanyatoursandtravels.com",
    });

    // Define your routes
    const routes = [
      // Main pages - high priority, frequent updates
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/about", changefreq: "weekly", priority: 0.8 },
      { url: "/services", changefreq: "weekly", priority: 0.8 },
      { url: "/contact", changefreq: "weekly", priority: 0.7 },

      // Authentication routes
      { url: "/login", changefreq: "monthly", priority: 0.6 },
      { url: "/register", changefreq: "monthly", priority: 0.6 },
      { url: "/forgot-password", changefreq: "monthly", priority: 0.5 },

      // Admin routes
      { url: "/dashboard", changefreq: "daily", priority: 0.4 },
      { url: "/profile", changefreq: "weekly", priority: 0.3 },
      { url: "/users", changefreq: "daily", priority: 0.4 },
      { url: "/reviews", changefreq: "daily", priority: 0.4 },
      { url: "/queries", changefreq: "daily", priority: 0.4 },
      { url: "/bookings", changefreq: "daily", priority: 0.4 },
    ];
    // Write routes to sitemap
    routes.forEach((route) => smStream.write(route));
    smStream.end();

    // Generate sitemap
    const sitemapBuffer = await streamToPromise(smStream);

    // Write sitemap to public folder
    fs.writeFileSync("./public/sitemap.xml", sitemapBuffer);

    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
}

generateSitemap();
