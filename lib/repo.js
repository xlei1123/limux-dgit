"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giteeRepoUtils = exports.githubRepoUtils = void 0;
const giteeRepoUtils = (owner, repoName, ref) => ({
    getRepoTreeUrl: () => `https://gitee.com/api/v5/repos/${owner}/${repoName}/git/trees/${ref}?recursive=1`,
    getDownloadUrl: (path) => `https://gitee.com/${owner}/${repoName}/raw/${ref}/${path}`,
});
exports.giteeRepoUtils = giteeRepoUtils;
const githubRepoUtils = (owner, repoName, ref) => ({
    getRepoTreeUrl: () => `https://api.github.com/repos/${owner}/${repoName}/git/trees/${ref}?recursive=1`,
    getDownloadUrl: (path) => `https://raw.githubusercontent.com/${owner}/${repoName}/${ref}/${path}`,
});
exports.githubRepoUtils = githubRepoUtils;
