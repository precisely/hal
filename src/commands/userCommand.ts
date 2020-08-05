import { Command, CommandResult } from "commands/command";
import { Term } from "commands/term";
import { ICommandSession } from "session";

/**
 * UserCommand - subclasses respond to a user input and may return new
 *               commands to be executed
 */
export abstract class UserCommand extends Command {
  constructor(public key: string) {
    super();
  }

  /**
   * Subclasses should throw
   * @param session
   * @param response
   */
  protected async executeResponse(session: ICommandSession, response: any): Promise<CommandResult> {
    throw new Error(`Subclass must provide an implementation of executeResponse`);
  }

  /**
   * Handles a response from the user
   * @param session
   * @param response
   */
  async handleResponse(session: ICommandSession, response: any): Promise<CommandResult> {
    const result = this.executeResponse(session, response);
    session.setResponse(this.key, response);
    return result;
  }

  setResponse(session: ICommandSession, response: any): void {
    if (!this.key) {
      this.key = session.makeKey((<any>this.constructor).type);
    }
    session.setResponse(this.key, response);
  }

}
