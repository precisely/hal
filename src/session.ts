import { ChatCommand } from "commands/chatCommand";
import { Command } from "commands/command";
import { UserCommand } from 'commands/userCommand';
import { Dialog } from "dialog";
import { KeyValues } from 'types';
import { IUserInterface } from "userInterface";
import { isUndefined } from "lodash";

export type SessionMode = 'chat' | 'form';

export interface ICommandSession {
  setResponse(key: string, value: any): void;
  getResponse(key: string): KeyValues;
  startDialog(dialog: Dialog, args: KeyValues, resultKey?: string): void;
  endDialog(): void;
  makeKey(keyBase: string): string;

  readonly userInterface: IUserInterface;
  typingSpeed: number;
  typing: boolean;
  readonly mode:  SessionMode;
}

export type SessionOptions = {
  userInterface: IUserInterface,
  mode?: SessionMode,
  typing?: boolean,
  typingSpeed?: number
};

export class Session implements ICommandSession {
  private stack: StackFrame[] = [];
  private completedFrames: StackFrame[] = [];
  private responses: KeyValues = {};
  private keyPath: string[] = [];
  private keyCounter = 0;
  public readonly userInterface: IUserInterface;
  public readonly mode: SessionMode;
  public typing: boolean;
  public typingSpeed: number;

  constructor(options: SessionOptions) {
    this.userInterface = options.userInterface;
    this.mode = options.mode || 'chat';
    this.typing = isUndefined(options.typing) ? true : options.typing;
    this.typingSpeed = isUndefined(options.typingSpeed) ? 120 : options.typingSpeed;
  }

  //
  // ICommandSession implementation
  //

  public setResponse(key: string, value: any) {
    this.responses[this.makeKey(key)] = value;
  }
  public getResponse(key: string): any {
    return this.responses[this.makeKey(key)];
  }
  public getAllResponses(): KeyValues {
    return this.responses;
  }

  public makeKey(keyBase: string): string {
    return `${keyBase}${this.keyCounter++}`;
  }

  //
  // Regular interface
  //
  public async handleResponse(response: any): Promise<void> {
    const currentCommand = this.currentCommand();

    if (currentCommand instanceof UserCommand) {
      const newCommands = await currentCommand.handleResponse(this, response);
      if (newCommands) {
        this.currentFrame()?.pushCommands(newCommands);
        await this.run();
      }
    } else {
      throw new Error(`Unexpected response`)
    }
  }

  /**
   *
   * @param dialog
   * @param args
   * @param resultKey
   */
  public startDialog(dialog: Dialog, args: KeyValues, resultKey: string ) {
    this.keyPath.push(resultKey);
    this.stack.push(new StackFrame(dialog, args, resultKey));
    this.run();
  }

  /**
   * Ends the current dialog and returns the next StackFrame
   */
  public endDialog(): StackFrame | undefined {
    const completedFrame = this.stack.pop();
    this.keyPath.pop();
    if (completedFrame) {
      this.completedFrames.push(completedFrame);
      return this.currentFrame();
    }
  }

  public currentCommand(): Command | undefined {
    const currentFrame = this.currentFrame();
    if (currentFrame) {
      return currentFrame.currentCommand();
    }
  }

  public currentFrame(): StackFrame | undefined {
    return this.stack[0];
  }

  /**
   * run() executes commands until a ResponseCommand is found, at which
   * point, execution pauses to allow the user to respond.
   */
  private async run() {
    // execute may be called many times for the currentFrame
    let currentFrame = this.currentFrame();

    while (currentFrame) {
      let nextCommand = currentFrame.popCommand();

      while (nextCommand) {
        // ignore ChatCommands if not in chat mode
        if (this.mode === 'chat' || !(nextCommand instanceof ChatCommand)) {
          const newCommands = await nextCommand.execute(this);
          if (newCommands) {
            currentFrame.pushCommands(newCommands);
          }
        }

        if (nextCommand instanceof UserCommand) {
          break;
        } else {
          nextCommand = currentFrame.popCommand();
        }
      }

      // If nextCommand is undefined at this point it means that the
      // currentFrame finished without requiring a response, so
      // execution should continue with the previous frame in the stack.
      if (!nextCommand) {
        currentFrame = this.endDialog();
      }
    }
  }
}

/**
 * The StackFrame represents a dialog and contains a secondary stack of
 * commands which tracks progress of the user's interaction with the dialog
 */
class StackFrame {
  public readonly answers: KeyValues = {};

  constructor(
    public readonly dialog: Dialog,
    public readonly args: KeyValues = {},
    public readonly resultKey?: string
  ) {
    this.commands = dialog.commands.map(o => o);
  }

  private commands: Command[];
  private executedCommands: Command[] = [];

  public currentCommand(): Command | undefined {
    if (this.executedCommands.length > 0) {
      return this.executedCommands[0];
    }
  }

  public popCommand() {
    const nextCommand = this.commands.shift();
    if (nextCommand) {
      this.executedCommands.unshift(nextCommand);
    }
    return nextCommand;
  }

  public pushCommands(commands: Command[]): void {
    this.commands = commands.concat(this.commands);
  }
}