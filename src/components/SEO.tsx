import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export default function SEO({ title, description, path }: SEOProps) {
  const canonicalUrl = `https://spirecrest.in${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="IN-UP" />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
}
