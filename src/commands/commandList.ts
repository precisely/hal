import { isArray } from "lodash";
import { TextCommand } from "./textCommand";
import { ReplyCommand } from "./replyCommand";
import { Command } from "./command";
import { ChatCommand } from "./chatCommand";

export class CommandList {
  static load(commands: any): Command[] {
    if (!commands) {
      return [];
    } else if (isArray(commands)) {
      return commands.map(cmd => this.loadTopLevelCommand(cmd));
    } else {
      return this.load([commands]);
    }
  }

  static loadTopLevelCommand(command: any): Command {
    const cmd = TextCommand.make(command) ||
                ReplyCommand.make(command) ||
                ChatCommand.make(command);
    if (!cmd) {
      throw new Error(`Expecting a top level command, but received ${command}`);
    }
    return cmd;
  }
}