declare const giteeRepoUtils: (owner: string, repoName: string, ref: string, token?: string | undefined) => {
    getRepoTreeUrl: () => string;
    getDownloadUrl: (path: string) => string;
};
declare const githubRepoUtils: (owner: string, repoName: string, ref: string) => {
    getRepoTreeUrl: () => string;
    getDownloadUrl: (path: string) => string;
};
export { githubRepoUtils, giteeRepoUtils, };
