import fs from 'fs';
import path from 'path';
import {
    PackageInfo, GitLinkInfo, GitType,
} from './type';

export const GetPackageInfo = (): PackageInfo => {
    const buffer = fs.readFileSync(path.resolve(__dirname, '../../package.json'));
    return JSON.parse(buffer.toString());
};

export const GITHUB_ADDRESS = 'https://github.com/';
export const GITEE_ADDRESS = 'https://gitee.com/';
export const isHttpsLink = (link: string, gitType: GitType) => {
    const git_address = gitType === 'gitee' ? GITEE_ADDRESS : GITHUB_ADDRESS;
    return link.trim().startsWith(git_address);
};

export const ParseGitHttpsLink = (httpsLink: string, gitType: GitType): GitLinkInfo => {
    const git_address = gitType === 'gitee' ? GITEE_ADDRESS : GITHUB_ADDRESS;
    let nextLink = httpsLink.trim().slice(git_address.length);
    let index = nextLink.indexOf('/');
    if (index === -1) throw new Error('invalid git address.');
    const owner = nextLink.slice(0, index);
    nextLink = nextLink.slice(owner.length + 1);
    index = nextLink.indexOf('/');
    let repoName: string;
    if (index === -1) {
        repoName = nextLink.slice(0);
        if (!repoName) throw new Error('invalid git address.');
        return {
            owner,
            repoName,
            ref         : 'master',
            relativePath: '',
            type        : 'tree',
        };
    }
    repoName = nextLink.slice(0, index);
    nextLink = nextLink.slice(repoName.length + 1);
    index = nextLink.indexOf('/');
    let ref = 'master';
    let relativePath = '';
    let type = 'tree';
    if (index === -1) {
        if (repoName.endsWith('.git')) {
            const lastIndex = -4;
            repoName = repoName.slice(0, lastIndex);
        }
    } else {
        type = nextLink.slice(0, index);
        nextLink = nextLink.slice(type.length + 1);
        index = nextLink.indexOf('/');
        if (index === -1) {
            ref = nextLink.slice(0) || 'master';
        } else {
            ref = nextLink.slice(0, index);
            relativePath = nextLink.slice(ref.length + 1);
        }
    }

    return {
        owner,
        repoName,
        ref,
        relativePath,
        type,
    };
};

export const TextEllipsis = (text: string, maxLen: number): string => (text.length >= maxLen ? `${ text.slice(0, maxLen) }...` : text);

export const MakeDirs = (dirs: string): void => {
    const mkdirs = (dir: string, callback?: ()=> void) => {
        if (fs.existsSync(dir)) {
            callback && callback();
            return;
        }

        mkdirs(path.dirname(dir), () => {
            fs.mkdirSync(dir);
            callback && callback();
        });
    };

    if (fs.existsSync(dirs)) return;
    mkdirs(dirs);
};

export const AddExtraRandomQs = (origin: string): string => {
    if (origin.indexOf('?') !== -1) {
        return `${ origin }&_t=${ Math.random() }`;
    }
    return `${ origin }?_t=${ Math.random() }`;
};
