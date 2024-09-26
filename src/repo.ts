const giteeRepoUtils = (owner: string, repoName: string, ref: string, token?: string) => ({
    getRepoTreeUrl: () => {
        if (token) {
            return `https://gitee.com/api/v5/repos/${ owner }/${ repoName }/git/trees/${ ref }?recursive=1&access_token=${ token }`;
        }
        return `https://gitee.com/api/v5/repos/${ owner }/${ repoName }/git/trees/${ ref }?recursive=1`;
    },
    getDownloadUrl: (path: string) => `https://gitee.com/${ owner }/${ repoName }/raw/${ ref }/${ path }`,
});

const githubRepoUtils = (owner: string, repoName: string, ref: string) => ({
    getRepoTreeUrl: () => `https://api.github.com/repos/${ owner }/${ repoName }/git/trees/${ ref }?recursive=1`,
    getDownloadUrl: (path: string) => `https://raw.githubusercontent.com/${ owner }/${ repoName }/${ ref }/${ path }`,
});


export {
    githubRepoUtils,
    giteeRepoUtils,
};
