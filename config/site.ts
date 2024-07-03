export const siteUrl = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig = (locale?: string) => ({
  name: "Library Hub",
  url: siteUrl + "/" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: "A sleek library management system",
});

export type SiteConfig = typeof siteConfig;
