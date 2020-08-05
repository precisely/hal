import { isUndefined } from 'lodash';
import { KeyValues } from 'types';
import { Command } from './commands/command';
import { makeCommandList } from './commands/helpers';

// Params
export type DialogParams = { [key: string]: DialogParam};
export type DialogParam = {
  type?: string,
  required?: boolean,
};

export class Dialog {
  constructor(
    public readonly commands: Command[],
    public readonly topLevel: boolean,
    public readonly params: DialogParams) {
  }

  static make(fragment: any) {
    return new Dialog(
      makeCommandList(fragment.do),
      fragment.topLevel,
      fragment.params
    );
  }

  checkArguments(args: KeyValues) {
    for (const [key, param] of Object.entries(this.params)) {
      if (param.required && isUndefined(args[key])) {
        throw new Error(`Dialog ${this.constructor.name} required argument ${key} is missing.`);
      }
      if (param.type && typeof args[key] !== param.type) {
        throw new Error(`Dialog ${this.constructor.name} argument ${key}`);
      }
    }
  }
}