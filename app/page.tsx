import { Hero } from "@/components/Hero";
import { FeaturedWork } from "@/components/FeaturedWork";
import { GitHubRepos } from "@/components/GitHubRepos";
import { TechStack } from "@/components/TechStack";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Footer } from "@/components/Footer";
import { getGitHubRepositories } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Mantra2226";
  const linkedinUrl = "https://www.linkedin.com/in/john-powell-39b295379";
  const email = "desarixpowell@gmail.com";

  const repos = await getGitHubRepositories(username);

  return (
    <main className="min-h-screen bg-ambient bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-16 sm:space-y-20">
        <Hero
          name="JOHN KAMAU"
          githubUsername={username}
          linkedinUrl={linkedinUrl}
          email={email}
        />

        <FeaturedWork />

        <GitHubRepos repos={repos} username={username} />

        <TechStack />

        <PhotoGallery />

        <Footer
          githubUsername={username}
          linkedinUrl={linkedinUrl}
          email={email}
        />
      </div>
    </main>
  );
}
