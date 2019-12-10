
declare interface Repo {
  [k: string]: any
}

declare interface GithubResult {
  message: "Organization members cannot delete repositories.",
  documentation_url: "https://developer.github.com/v3/repos/#delete-a-repository"
}