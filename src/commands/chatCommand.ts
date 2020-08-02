import { Command } from 'commands/command';
import { CommandList } from 'commands/commandList';

/**
 * Represents a block of commands which only run in chat mode
 */
export class ChatCommand extends Command {
  constructor(
    public readonly commands: Command[]
  ) { super(); }

  static make(fragment: any) {
    if (fragment.type === 'chat') {
      return CommandList.load(fragment.commands);
    }
  }
}