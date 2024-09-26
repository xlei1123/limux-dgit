import fs from 'fs';
import path from 'path';
import {
    after, describe, it, before,
} from 'mocha';
import { expect } from 'chai';
import dgit from '../src/dgit';

const Clean = (targets: Array<string>, callback: Function) => {
    targets.forEach(deletePath => {
        const stat = fs.statSync(deletePath);
        if (stat.isFile()) {
            return fs.unlinkSync(deletePath);
        }
        if (stat.isDirectory()) {
            const nextTargets = fs.readdirSync(deletePath).map(fileName => `${ deletePath }/${ fileName }`);
            Clean(nextTargets, () => {
                fs.rmdirSync(deletePath);
            });
        }
    });
    callback();
};

describe('dgit功能测试', () => {
    const baseDir = 'testDir';
    const basePath = path.resolve(__dirname, '../', baseDir);
    const target = path.resolve(basePath, './package.json');


    const target2 = path.resolve(basePath, './src/components/LimuPagination.vue');
    const target3 = path.resolve(basePath, './src/views/list2/index.vue');
    const target4 = path.resolve(basePath, './src/views/list2/components/Dialog.vue');
    const target5 = path.resolve(basePath, './src/views/list2/components/EditDialog.vue');

    const deleteTarget = (): Promise<void> => new Promise(resolve => {
        if (fs.existsSync(basePath)) {
            return Clean([ basePath ], resolve);
        }
        resolve();
    });

    before(deleteTarget);
    after(deleteTarget);

    it('dgit 能拉取远端git指定目录代码', async () => {
        await dgit(
            {
                owner       : 'xlei1123',
                repoName    : 'limu-ele-pro',
                ref         : 'main',
                relativePath: 'package.json',
                gitType     : 'gitee',
                token       : '27fb2108f685ee79dc303ad7e21f2834',
            },
            './testDir',
            { log: true },
            {
                onSuccess () {
                    expect(fs.existsSync(target)).to.be.equal(true);
                },
            },
        );
    });

    it('dgit 能直接使用githubLink方式拉取远端git指定目录代码', async () => {
        await dgit(
            {
                gitLink: 'https://gitee.com/xlei1123/limu-ele-pro/raw/main/package.json',
                gitType: 'gitee',
                token  : '27fb2108f685ee79dc303ad7e21f2834',
            },
            './testDir',
            {
                log          : true,
                parallelLimit: 1,
            },
            {
                onSuccess () {
                    expect(fs.existsSync(target)).to.be.equal(true);
                },
            },
        );
    });

    it('dgit 能直接使用giteeLink方式拉取远端git指定深层指定文件代码', async () => {
        await dgit(
            {
                gitLink: 'https://gitee.com/xlei1123/limu-ele-pro/raw/main/src/components/LimuPagination.vue',
                gitType: 'gitee',
                token  : '27fb2108f685ee79dc303ad7e21f2834',
            },
            './testDir/src/components',
            {
                log          : true,
                parallelLimit: 1,
            },
            {
                onSuccess () {
                    expect(fs.existsSync(target2)).to.be.equal(true);
                },
            },
        );
    });

    it('dgit 能直接使用githubLink方式拉取远端git指定深层指定目录代码', async () => {
        await dgit(
            {
                gitLink: 'https://gitee.com/xlei1123/limu-ele-pro/tree/main/src/views/list2',
                gitType: 'gitee',
                token  : '27fb2108f685ee79dc303ad7e21f2834',
            },
            './testDir/src/views/list2',
            {
                log          : true,
                parallelLimit: 2,
            },
            {
                onSuccess () {
                    expect(fs.existsSync(target3)).to.be.equal(true);
                    expect(fs.existsSync(target4)).to.be.equal(true);
                },
            },
        );
    });

    it('dgit 能接受exclude include 参数筛选目标目录文件', async () => {
        await dgit(
            {
                gitLink: 'https://gitee.com/xlei1123/limu-ele-pro/tree/main/src/views',
                gitType: 'gitee',
                token  : '27fb2108f685ee79dc303ad7e21f2834',
            },
            './testDir/src/views',
            {
                log          : true,
                parallelLimit: 2,
                exclude      : [ 'list2' ],
                include      : [ 'list2/components' ],
            },
            {
                onSuccess () {
                    expect(fs.existsSync(target4)).to.be.equal(true);
                    expect(fs.existsSync(target5)).to.be.equal(true);
                },
            },
        );
    });
});
