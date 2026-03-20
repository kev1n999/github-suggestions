import { env } from "./env";

export const githubRoutes = {
  user: (username: string): string => env.BASE_URL + `/users/${username}/`,
  userRepos: (username: string): string => env.BASE_URL + `/users/${username}/repos`
};
