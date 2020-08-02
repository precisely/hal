import { isString, isObject } from 'lodash';

import { Command } from './command';

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
}
