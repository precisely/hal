import { Command } from './command';
import { isUndefined, isPlainObject, isArray, isObject } from 'lodash';
import { InvalidInputError } from 'invalidInputError';

export class ReplyCommand extends Command {
  constructor(
    key: string | undefined,
    public readonly choices: ReplyChoice[] = []
  ) { super(); }

  static make(fragment: any) {
    if (fragment.choices && (isUndefined(fragment.type) || fragment.type === 'reply')) {
      return new ReplyCommand(
        fragment.key,
        this.makeChoices(fragment.choices)
      );
    }
  }

  private static makeChoices(choices: any): ReplyChoice[] {
    if (isPlainObject(choices)) {
      return this.replyChoicesFromPJOBChoices(choices);
    } else if (isArray(choices)) {
      return ReplyChoice.makeList(choices);
    } else {
      throw new InvalidInputError(choices, 'reply.choices');
    }
  }

  /**
   *
   * @param choices A PJOB where the keys are the choice values,
   *                and the values define the rest of the ReplyChoice { yes: ..., no: ... }
   */
  private static replyChoicesFromPJOBChoices(choicesMap: any) {
    const choices = Object.entries(choicesMap);
    const normalizedFragments = choices.map(([value, fragment]) => {
      if (isObject(fragment)) {
        return {value, text: value, ...fragment};
      } else {
        return {value, text: value, do: fragment};
      }
    });
    return ReplyChoice.makeList(normalizedFragments);
  }
}

export class ReplyChoice extends Command {
  public readonly text: string;
  public value: any;
  public readonly commands: Command[];
  constructor(
    text: string, value?: any, commands?: Command[]
  ) {
    super();
    this.text = text;
    this.value = value ? value : text;
    this.commands = commands || [];
  }

  static make(fragment: any) {
    return new ReplyChoice(
      fragment.text,
      fragment.value || fragment.text,
    );
  }
}