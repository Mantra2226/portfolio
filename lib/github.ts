export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Ruby: "#701516",
  Java: "#b07219",
  Shell: "#89e051",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Solidity: "#AA6746",
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: "market_mtaani",
    description: "Rural Business Hub — Connects small-scale farmers and artisans to digital marketplaces.",
    url: "https://github.com/Mantra2226/market_mtaani",
    stargazerCount: 1,
    forkCount: 0,
    primaryLanguage: { name: "Python", color: "#3572A5" },
  },
  {
    name: "smart_poultry",
    description: "Comprehensive web-based telemetry and flock management platform for smart poultry farming.",
    url: "https://github.com/Mantra2226/smart_poultry",
    stargazerCount: 1,
    forkCount: 0,
    primaryLanguage: { name: "Python", color: "#3572A5" },
  },
  {
    name: "djangosystem",
    description: "High-integrity modular enterprise ERP backend built with Django and PostgreSQL.",
    url: "https://github.com/Mantra2226/djangosystem",
    stargazerCount: 1,
    forkCount: 0,
    primaryLanguage: { name: "Python", color: "#3572A5" },
  },
  {
    name: "url-shortener",
    description: "High-performance URL redirection engine with click analytics and Redis caching.",
    url: "https://github.com/Mantra2226/url-shortener",
    stargazerCount: 0,
    forkCount: 0,
    primaryLanguage: { name: "Python", color: "#3572A5" },
  },
];

interface GraphQLPinnedResponse {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: Array<{
          name: string;
          description: string | null;
          url: string;
          stargazerCount: number;
          forkCount: number;
          primaryLanguage: {
            name: string;
            color: string;
          } | null;
        }>;
      };
    };
  };
  errors?: unknown;
}

interface RestRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
}

export async function getGitHubRepositories(
  username: string = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Mantra2226"
): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  // 1. Try GraphQL pinned items if token is available
  if (token) {
    try {
      const graphQLQuery = `
        query getPinnedRepos($username: String!) {
          user(login: $username) {
            pinnedItems(first: 6, types: [REPOSITORY]) {
              nodes {
                ... on Repository {
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "portfolio-agent",
        },
        body: JSON.stringify({
          query: graphQLQuery,
          variables: { username },
        }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json: GraphQLPinnedResponse = await res.json();
        const pinned = json.data?.user?.pinnedItems?.nodes;
        if (pinned && pinned.length > 0) {
          return pinned.map((repo) => ({
            name: repo.name,
            description: repo.description,
            url: repo.url,
            stargazerCount: repo.stargazerCount,
            forkCount: repo.forkCount,
            primaryLanguage: repo.primaryLanguage,
          }));
        }
      }
    } catch (err) {
      console.warn("GitHub GraphQL fetch failed, falling back to REST:", err);
    }
  }

  // 2. Fallback to GitHub REST API (active recent repositories)
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-agent",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const restRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (restRes.ok) {
      const repos: RestRepoResponse[] = await restRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        return repos.slice(0, 6).map((repo) => {
          const lang = repo.language;
          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stargazerCount: repo.stargazers_count,
            forkCount: repo.forks_count,
            primaryLanguage: lang
              ? {
                  name: lang,
                  color: LANGUAGE_COLORS[lang] || "#64748b",
                }
              : null,
          };
        });
      }
    }
  } catch (err) {
    console.warn("GitHub REST fetch failed, using fallback repos:", err);
  }

  // 3. Fallback when rate-limited, offline, or build error occurs
  return FALLBACK_REPOS;
}
