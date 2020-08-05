import { stripUndefinedKeys, timeout } from 'commands/helpers';
import { isString, isUndefined } from 'lodash';
import { ICommandSession } from 'session';
import { Command, CommandResult } from './command';


export class TextCommand extends Command {
  constructor(
    public readonly text: string,
    public readonly typing?: boolean,
    public readonly typingSpeed?: number
  ) { super(); }

  static make(fragment: any) {
    if (isString(fragment)) {
      return new TextCommand(fragment);
    } else if (fragment?.type ? fragment.type ==='text' : isString(fragment?.text)) {
      return new TextCommand(fragment.text, fragment.typing, fragment.typingSpeed);
    }
  }

  async execute(session: ICommandSession): Promise<CommandResult> {
    const typing = isUndefined(this.typing) ? session.typing : this.typing;
    const wordsPerSecond = (isUndefined(this.typingSpeed) ? session.typingSpeed : this.typingSpeed) / 60;
    const charactersPerSecond = 5 * wordsPerSecond;

    if (typing) {
      await session.userInterface.showEllipsis();
      const seconds = this.text.length / charactersPerSecond;
      await timeout(seconds * 1000);
      await session.userInterface.hideEllipsis();
    }
    await session.userInterface.showText(this.text);
    return;
  }

  public toString(): string {
    return `TextCommand(${stripUndefinedKeys({text: this.text, typing: this.typing, typingSpeed: this.typingSpeed})})`;
  }
}
