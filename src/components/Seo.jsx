import { Helmet } from "react-helmet-async";
import { profile } from "../data/profile";

export default function Seo({ title, description, path = "/", jsonLd = false }) {
  const url = `${profile.siteUrl.replace(/\/$/, "")}${path}`;
  const fullTitle = `${title} | ${profile.name}`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.position,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    url: profile.siteUrl,
    address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
    worksFor: { "@type": "Organization", name: profile.company },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Shivaji Science College, Nagpur" },
    knowsAbout: ["React.js", "Angular", "JavaScript", "REST APIs", "Tailwind CSS"],
    ...(profile.linkedin || profile.github ? { sameAs: [profile.linkedin, profile.github].filter(Boolean) } : {}),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={profile.name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(person)}</script>}
    </Helmet>
  );
}
