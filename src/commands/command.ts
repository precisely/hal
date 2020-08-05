import { Term } from "commands/term";
import { ICommandSession } from "session";
// interface CommandConstructor<M> {
//   new (...args: any[]): M

//   make(fragment: any, key?: string): M;
//   makeList(fragment: any[]): M;
//   type(): string;
// }
export type CommandResult = Command[] | undefined;

export abstract class Command extends Term {
  /**
   * Performs the main action of the command, which may include returning
   * @param session
   */
  abstract async execute(session: ICommandSession): Promise<CommandResult>;
}
