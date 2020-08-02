import { InvalidInputError } from "invalidInputError";

// interface CommandConstructor<M> {
//   new (...args: any[]): M

//   make(fragment: any, key?: string): M;
//   makeList(fragment: any[]): M;
//   type(): string;
// }

export abstract class Command {
  /**
   * Returns a string based on the class name
   * E.g., if class is FooBarCommand, returns "fooBar"
   */
  static type(): string {
    const ctorName: string = (<any>this).name;
    const withoutCommandSuffix = ctorName.replace(/(.*)Command$/, '');
    return withoutCommandSuffix.charAt(0).toLowerCase() + ctorName.slice(1);
  }

  static make(fragment: any): any {
    throw new Error(`Derived class ${this} must implement static make method`);
  }

  /**
   * Returns an array of Objects of this type, or throws an error
   * @param this
   * @param fragment
   */
  static makeList(fragment: any[]): any[] {
    return fragment.map(cmd => {
      const listEntry = this.make(cmd);
      if (!listEntry) {
        throw new InvalidInputError(cmd, this.type());
      }
      return listEntry;
    });
  }
}
