export const siteConfig = {
  name: "John Kamau",
  headlineName: "JOHN KAMAU",
  role: "Full-Stack Software Engineer & Systems Architect",
  bio: "Building high-reliability backend systems, real-time IoT telemetry pipelines, and reactive web applications. Passionate about transforming intricate business workflows into resilient distributed architectures with clean data modeling.",
  location: "Nairobi, KE",
  email: "desarixpowell@gmail.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-jp-kamau.vercel.app",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Mantra2226",
  socials: {
    github: "https://github.com/Mantra2226",
    linkedin: "https://www.linkedin.com/in/john-powell-39b295379",
    newcomma: "https://newcomma.com/kamauislike/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
