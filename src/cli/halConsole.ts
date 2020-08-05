import { IUserInterface, ReplyButtonDef } from "userInterface";
import { isNumber, omit, over } from "lodash";
import { Session, SessionMode } from "session";
import { Dialog } from "dialog";
// import * as readline from 'readline';
import * as readlineSync from 'readline-sync';

export class HALConsole implements IUserInterface {
  public readonly session: Session;
  constructor(mode: SessionMode = 'chat') {
    this.session = new Session({
      userInterface: this,
      mode
    });
  }
  private ellipsis?: string[];

  start(fragment: any): void {
    const dialog = Dialog.make(fragment);
    this.session.startDialog(dialog, {}, 'responses');
  }

  async showForm(form: any) {}

  async showReplyButtons(buttons: ReplyButtonDef[]) {
    buttons.forEach((button, index) => {
      console.log(`${index+1}) ${button.text}`);
    });

    var selection;
    do {
      console.log(`Enter a number from 1 to ${buttons.length}`);
      const answer = readlineSync.question('> ');
      selection = parseInt(answer);
    } while (!isNumber(selection) || selection<1 || selection>buttons.length);

    await this.session.handleResponse(buttons[selection - 1].value);
  }

  async showText(text: string) {
    console.log(text);
  }

  async showEllipsis() {
    this.ellipsis = ['.ooo', 'o.oo', 'oo.o', 'ooo.'];
    setTimeout(() => this.animateEllipsis(), 500);
  }
  async hideEllipsis() {
    process.stdout.clearLine(-1);  // clear current text
    process.stdout.cursorTo(0);
    this.ellipsis = undefined;
  }

  private animateEllipsis() {
    if (this.ellipsis) {
      overwrite(this.ellipsis[0]);
      this.ellipsis.push(this.ellipsis.shift() || '...');
      setTimeout(() => this.animateEllipsis(), 400);
    }
  }
}

function overwrite(text: string) {
  process.stdout.clearLine(-1);  // clear current text
  process.stdout.cursorTo(0);
  process.stdout.write(text);
}