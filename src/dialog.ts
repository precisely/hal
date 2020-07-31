import {isString, isArray} from 'lodash';
import {Instructions, Instruction, DialogDef, DialogParams} from 'dsltypes';
import {normalizeInstructions} from 'normalize';
class Dialog {
  readonly instructions: Instruction[];
  readonly params: DialogParams;

  constructor({do: instructions, topLevel, params}: DialogDef) {
    this.instructions = normalizeInstructions(instructions);
    this.params = params;
  }
}