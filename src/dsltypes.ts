/** @see {isDialogDef} ts-auto-guard:type-guard */
export type DialogDef = {
  do: CommandDefs,
  topLevel: boolean,
  params: DialogParams
};

//
// CommandDefs - definitions of commands, as they
//

///** @see {AreCommandDefs} ts-auto-guard:type-guard */
export type CommandDefs = CommandDef | CommandDef[];
/** @see {IsCommandDef} ts-auto-guard:type-guard */
export type CommandDef = ChatCommandDef; // | InputInstruction;
/** @see {IsChatCommandDef} ts-auto-guard:type-guard */
export type ChatCommandDef = { chat: CommandDefs } | string;

/** @see {IsInputInstruction} ts-auto-guard:type-guard */
export type InputCommandDef = ListCommandDef | ReplyCommandDef;

/** @see {isListInstruction} ts-auto-guard:type-guard */
export type ListCommandDef = {
  type: 'list',
  key: string,
  formTitle: string,
  editable: boolean,
  choices: ListItem[] | { [id: string]: ListItem }
};

export type NormalizedListItem = {

};
export type ListItem = {
  text?: string,
  value?: any,
  icon?: string,
  do?: CommandDefs
};

/** @see {IsReplyInstruction} ts-auto-guard:type-guard */
export type ReplyCommandDef = {
  type: 'reply',
  choices: ReplyItem[] | { [text: string]: ReplyItem }
};

/** @see {IsReplyItem} ts-auto-guard:type-guard */
export type ReplyItem = CommandDefs | {
  id?: string,
  text?: string,
  do?: CommandDefs
};


// Params
/** @see {AreDialogParams} ts-auto-guard:type-guard */
export type DialogParams = { [key: string]: DialogParam};
/** @see {IsDialogParam} ts-auto-guard:type-guard */
export type DialogParam = {
  type: string,
  required?: boolean,
};