import { PackageInfo, GitLinkInfo, GitType } from './type';
export declare const GetPackageInfo: () => PackageInfo;
export declare const GITHUB_ADDRESS = "https://github.com/";
export declare const GITEE_ADDRESS = "https://gitee.com/";
export declare const isHttpsLink: (link: string, gitType: GitType) => boolean;
export declare const ParseGitHttpsLink: (httpsLink: string, gitType: GitType) => GitLinkInfo;
export declare const TextEllipsis: (text: string, maxLen: number) => string;
export declare const MakeDirs: (dirs: string) => void;
export declare const AddExtraRandomQs: (origin: string) => string;
