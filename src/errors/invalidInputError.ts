import { dump } from 'js-yaml';

export class InvalidInputError extends Error  {
  public readonly input: any;
  public readonly type?: string;

  constructor(input: any, type?: string) {
    var printableInput: string;
    try {
      printableInput = dump(input);
    } catch {
      printableInput = JSON.stringify(input);
    }

    const inputType = type ? ` (expecting "${type}")`: "";
    super(`Invalid input provided${inputType}: ${input}`);
    this.input = input;
    this.type = type;
  }
}