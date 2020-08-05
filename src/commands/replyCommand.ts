import { Term } from 'commands/term';
import { InvalidInputError } from 'errors/invalidInputError';
import { isArray, isObject, isPlainObject, isUndefined } from 'lodash';
import { ICommandSession } from 'session';
import { Command, CommandResult } from './command';
import { UserCommand } from './userCommand';
import { makeCommandList } from 'commands/helpers';

export class ReplyCommand extends UserCommand {
  constructor(
    key: string,
    public readonly choices: ReplyChoice[] = []
  ) { super(key); }

  static make(fragment: any) {
    if (fragment.choices && (isUndefined(fragment.type) || fragment.type === 'reply')) {
      return new ReplyCommand(
        fragment.key,
        this.makeChoices(fragment.choices)
      );
    }
  }

  public async execute(session: ICommandSession): Promise<CommandResult> {
    const replyButtons = this.choices.map(choice => ({ text: choice.text, value: choice.value }));
    await session.userInterface.showReplyButtons(replyButtons);
    return;
  }

  protected async executeResponse(session: ICommandSession, response: any): Promise<CommandResult> {
    const choice = this.choices.find(choice => choice.value === response);
    if (choice && choice.value === response) {
      return choice.commands;
    }
    throw new InvalidInputError(this.key, response);
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
      if (isPlainObject(fragment)) {
        return {value, text: value, ...<any>fragment};
      } else {
        return {value, text: value, do: fragment};
      }
    });
    return ReplyChoice.makeList(normalizedFragments);
  }

  public toString(): string {
    return `ReplyCommand(${{key: this.key, choices: this.choices }})`;
  }
}

export class ReplyChoice extends Term {
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
      makeCommandList(fragment.do)
    );
  }
}