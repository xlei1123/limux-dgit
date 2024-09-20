"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordPrompt = exports.DownloadPrompt = exports.CreatePrompt = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
exports.CreatePrompt = (questions) => inquirer_1.default.prompt(questions);
exports.DownloadPrompt = (currentInfo) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (currentInfo.owner &&
        currentInfo.repoName &&
        currentInfo.ref &&
        currentInfo.relativePath &&
        currentInfo.dest &&
        currentInfo.gitType)
        return currentInfo;
    const questions = [
        {
            type: 'list',
            name: 'gitType',
            message: '请选择托管平台',
            'default': 'github',
            when() {
                return !currentInfo.gitType;
            },
            choices: [
                { name: 'github', value: 'github' },
                { name: 'gitee', value: 'gitee' },
            ],
        },
        {
            type: 'input',
            name: 'owner',
            when() {
                return !currentInfo.owner;
            },
            validate(input) {
                return input && input.length > 0;
            },
            message: 'input git ownername.',
        },
        {
            type: 'input',
            name: 'repoName',
            when() {
                return !currentInfo.repoName;
            },
            validate(input) {
                return input && input.length > 0;
            },
            message: 'input git repoName.',
        },
        {
            type: 'input',
            name: 'ref',
            when() {
                return !currentInfo.ref;
            },
            validate(input) {
                return input && input.length > 0;
            },
            'default': 'master',
            message: 'input git branch or commit hash or tagname.',
        },
        {
            type: 'input',
            name: 'relativePath',
            when() {
                return !currentInfo.relativePath;
            },
            validate(input) {
                return input && input.length > 0;
            },
            'default': '.',
            message: 'input git relative path.',
        },
        {
            type: 'input',
            name: 'dest',
            when() {
                return !currentInfo.dest;
            },
            validate(input) {
                return input && input.length > 0;
            },
            'default': '.',
            message: 'input template output dest path.',
        },
    ];
    const answer = yield exports.CreatePrompt(questions);
    return {
        owner: answer.owner || currentInfo.owner,
        dest: answer.dest || currentInfo.dest,
        repoName: answer.repoName || currentInfo.repoName,
        relativePath: answer.relativePath || currentInfo.relativePath,
        ref: answer.ref || currentInfo.ref,
        gitType: answer.gitType || currentInfo.gitType,
    };
});
exports.PasswordPrompt = () => {
    const question = {
        type: 'password',
        name: 'password',
        validate(input) {
            return input && input.length > 0;
        },
        message: 'input git account password.',
    };
    return exports.CreatePrompt([question]);
};
