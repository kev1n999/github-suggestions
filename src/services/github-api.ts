import { githubRoutes } from "../config/api-routes";

export async function getUserRepositories(username: string) {
  try {
    const req = await fetch(githubRoutes.userRepos(username));
    const response = await req.json();
    if (!req.ok) throw new Error("An error ocurred to fetch it!\n" + response || await req.text());
    // ...
  } catch (err) {
    console.error("An error ocurred:\n", err);
  }
}
