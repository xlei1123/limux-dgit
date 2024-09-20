"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddExtraRandomQs = exports.MakeDirs = exports.TextEllipsis = exports.ParseGitHttpsLink = exports.isHttpsLink = exports.GITEE_ADDRESS = exports.GITHUB_ADDRESS = exports.GetPackageInfo = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
exports.GetPackageInfo = () => {
    const buffer = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../../package.json'));
    return JSON.parse(buffer.toString());
};
exports.GITHUB_ADDRESS = 'https://github.com/';
exports.GITEE_ADDRESS = 'https://gitee.com/';
exports.isHttpsLink = (link, gitType) => {
    const git_address = gitType === 'gitee' ? exports.GITEE_ADDRESS : exports.GITHUB_ADDRESS;
    return link.trim().startsWith(git_address);
};
exports.ParseGitHttpsLink = (httpsLink, gitType) => {
    const git_address = gitType === 'gitee' ? exports.GITEE_ADDRESS : exports.GITHUB_ADDRESS;
    let nextLink = httpsLink.trim().slice(git_address.length);
    let index = nextLink.indexOf('/');
    if (index === -1)
        throw new Error('invalid git address.');
    const owner = nextLink.slice(0, index);
    nextLink = nextLink.slice(owner.length + 1);
    index = nextLink.indexOf('/');
    let repoName;
    if (index === -1) {
        repoName = nextLink.slice(0);
        if (!repoName)
            throw new Error('invalid git address.');
        return {
            owner,
            repoName,
            ref: 'master',
            relativePath: '',
            type: 'tree',
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
    }
    else {
        type = nextLink.slice(0, index);
        nextLink = nextLink.slice(type.length + 1);
        index = nextLink.indexOf('/');
        if (index === -1) {
            ref = nextLink.slice(0) || 'master';
        }
        else {
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
exports.TextEllipsis = (text, maxLen) => (text.length >= maxLen ? `${text.slice(0, maxLen)}...` : text);
exports.MakeDirs = (dirs) => {
    const mkdirs = (dir, callback) => {
        if (fs_1.default.existsSync(dir)) {
            callback && callback();
            return;
        }
        mkdirs(path_1.default.dirname(dir), () => {
            fs_1.default.mkdirSync(dir);
            callback && callback();
        });
    };
    if (fs_1.default.existsSync(dirs))
        return;
    mkdirs(dirs);
};
exports.AddExtraRandomQs = (origin) => {
    if (origin.indexOf('?') !== -1) {
        return `${origin}&_t=${Math.random()}`;
    }
    return `${origin}?_t=${Math.random()}`;
};
