import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";

async function generateSitemap() {
  try {
    const smStream = new SitemapStream({
      hostname: "https://www.chaitanyatours.com",
    });

    // Define your routes
    const routes = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/about", changefreq: "weekly", priority: 0.8 },
      { url: "/services", changefreq: "weekly", priority: 0.8 },
      { url: "/tours", changefreq: "weekly", priority: 0.9 },
      { url: "/contact", changefreq: "weekly", priority: 0.7 },
      // Add all your website routes here
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
