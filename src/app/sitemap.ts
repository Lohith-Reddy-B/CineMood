import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const routes = [
    "",
    "/login",
    "/signup",
    "/forgot-password",
    "/browse",
    "/search",
    "/watch-with",
    "/watchlist",
    "/profile",
    "/policy/about",
    "/policy/contact",
    "/policy/privacy",
    "/policy/terms",
    "/policy/disclaimer",
    "/policy/cookies",
    "/policy/community",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
