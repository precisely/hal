// import {isReplyInstruction, isListInstruction, isPauseInstruction} from 'dsltypes.guard';
// }
// export function normalizeInstructions(o: any) {
//   return isArray(o) ? o.every(normalizeInstruction)
//           : isUndefined(o) || isNull(o) ? []
//           : [normalizeInstruction(o)];
// }

export function normalizeInstructions(o:any) { return []; }
// export function normalizeInstruction(o: any) {
//   if (isString(o)) {
//     return { type: 'text', text: o};
//   } else if (isReplyInstruction(o)) {
//     return normalizeReplyInstruction(o);
//   } else if (isListInstruction(o)) {
//     return normalizeListInstruction(o);
//   } else if (isPauseInstruction(o)) {
//     return normalizePauseInstruction(o);
//   } else {
//     throw new Error(`Invalid instruction ${o}`);
//   }
// }
