import fs from 'fs';
import { UrlOptions, CoreOptions } from 'request';
import { DgitGlobalOption, DgitLifeCycle } from './type';
declare type RequestOption = UrlOptions & CoreOptions;
export declare const requestGetPromise: (options: RequestOption, dgitOptions: DgitGlobalOption, hooks?: DgitLifeCycle | undefined) => Promise<any>;
export declare const requestOnStream: (url: string, ws: fs.WriteStream, dgitOptions: DgitGlobalOption, hooks?: DgitLifeCycle | undefined) => void;
export {};
