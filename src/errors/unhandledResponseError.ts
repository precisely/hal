export class UnhandledResponseError extends Error  {
  public readonly input: any;
  public readonly type?: string;

  constructor(key: string, response: any) {
    super(`Unable to handle response ${JSON.stringify(response)} for ${key}`);
  }
}