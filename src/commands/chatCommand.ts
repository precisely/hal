import { Command, CommandResult } from 'commands/command';
import { makeCommandList } from 'commands/helpers';

/**
 * Represents a block of commands which only run in chat mode
 */
export class ChatCommand extends Command {
  constructor(
    public readonly commands: Command[]
  ) { super(); }

  static make(fragment: any) {
    if (fragment.chat) {
      return new ChatCommand(makeCommandList(fragment.chat));
    }
  }

  async execute(): Promise<CommandResult> {
    return this.commands;
  }

  public toString(): string {
    const commands = this.commands.map((o: Command) => o.toString()).join(', ');
    return `ChatCommand(${{commands}})`;
  }
}