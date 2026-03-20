import { githubRoutes } from "../config/api-routes";
import { parseReposJson, RepositoriesJson } from "../utils/parse-json";

export async function getUserRepositories(username: string): Promise<RepositoriesJson[]> {
  let data: any;
  const req_url = githubRoutes.userRepos(username);
  const req = await fetch(req_url);
  console.log("New request: ", req_url);

  try {
    data = await req.json();
  } catch {
    data = await req.text();
  }
  if (!req.ok) {
    console.log("\nError to fetch repo:\n", data);
    throw new Error(
      "An error ocurred to fetch it!\n" + (typeof data === 'string' ? data : JSON.stringify(data))
    );
  }
  if (!Array.isArray(data)) throw new Error("The data isn't an array!");
  return data.map(parseReposJson);
}
