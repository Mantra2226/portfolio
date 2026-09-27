import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { GitHubRepos } from "@/components/GitHubRepos";
import { TechStack } from "@/components/TechStack";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Footer } from "@/components/Footer";
import { getGitHubRepositories } from "@/lib/github";

import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default async function Home() {
  const username = siteConfig.githubUsername;
  const repos = await getGitHubRepositories(username);

  return (
    <main className="min-h-screen bg-ambient bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 md:py-24 space-y-12 sm:space-y-16 md:space-y-20">
        <Hero
          name={siteConfig.headlineName}
          githubUsername={username}
          linkedinUrl={siteConfig.socials.linkedin}
          newcommaUrl={siteConfig.socials.newcomma}
          email={siteConfig.email}
        />

        <FeaturedWork />

        <GitHubRepos repos={repos} username={username} />

        <TechStack />

        <PhotoGallery />

        <Footer
          githubUsername={username}
          linkedinUrl={siteConfig.socials.linkedin}
          newcommaUrl={siteConfig.socials.newcomma}
          email={siteConfig.email}
        />
      </div>
    </main>
  );
}
