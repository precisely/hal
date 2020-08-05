import { isArray } from "lodash";
import { TextCommand } from "./textCommand";
import { ReplyCommand } from "./replyCommand";
import { Command } from "./command";
import { ChatCommand } from "./chatCommand";
import * as _ from 'lodash';

export function makeCommandList(commands: any): Command[] {
  if (!commands) {
    return [];
  } else if (isArray(commands)) {
    return commands.map(cmd => loadTopLevelCommand(cmd));
  } else {
    return makeCommandList([commands]);
  }
}

export function loadTopLevelCommand(command: any): Command {
  const cmd = TextCommand.make(command) ||
              ReplyCommand.make(command) ||
              ChatCommand.make(command);
  if (!cmd) {
    throw new Error(`Expecting a top level command, but received ${JSON.stringify(command)}`);
  }
  return cmd;
}

export function stripUndefinedKeys(obj: {[key: string]: any}): {[key: string]: any} {
  return _.pickBy(obj, _.identity);
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
