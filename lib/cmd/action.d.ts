import { Command } from 'commander';
import { CommandInfo } from './type';
declare const DownloadAction: (gitLink: string | undefined, cmd: Command & CommandInfo) => Promise<any>;
export default DownloadAction;
