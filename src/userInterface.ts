export type ReplyButtonDef = { text: string, value: string };
export type FormDef = {}; // TODO some representatio of FORM input capabilities
export interface IUserInterface {
  showForm(form: any): Promise<void>;
  showReplyButtons(buttons: ReplyButtonDef[]): Promise<void>;
  showText(text: string): Promise<void>;
  showEllipsis(): Promise<void>;
  hideEllipsis(): Promise<void>;
}