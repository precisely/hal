import {isString, isArray} from 'lodash';
import { Command } from './commands/command';
import { CommandList } from './commands/commandList';

// Params
export type DialogParams = { [key: string]: DialogParam};
export type DialogParam = {
  type: string,
  required?: boolean,
};

export class Dialog {
  // readonly commands: Command[];
  // readonly params: DialogParams;

  // constructor(public readonly commands: Command[], topLevel, params}: any) {
  //   this.commands = CommandList.load(commands);
  //   this.params = params || {};
  // }
}