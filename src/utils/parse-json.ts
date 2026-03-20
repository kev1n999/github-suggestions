export interface RepositoriesJson {
  name: string;
  description?: string | null;
  fork?: boolean | null;
  homepage?: string | null;
}

export function parseReposJson (json: RepositoriesJson): RepositoriesJson {
  return {
    name: json.name,
    description: json.description ?? null,
    fork: json.fork ?? null,
    homepage: json.homepage ?? null,
  }
}
