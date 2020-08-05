import { loadTopLevelCommand } from "commands/helpers";
import { TextCommand } from "commands/textCommand";
import { ReplyCommand } from "commands/replyCommand";

describe('commands/helpers', function () {
  describe('loadTopLevelCommand', function () {
    it('should read a text command', function () {
      expect(loadTopLevelCommand({
        type: 'text',
        text: "test"
      })).toBeInstanceOf(TextCommand);
    });
    it('should read a reply command', function () {
      expect(loadTopLevelCommand({
        type: 'reply',
        choices: [ { key:'the-key', value: 'the-value'}]
      })).toBeInstanceOf(ReplyCommand);
    });
    it('should read a chat command', function () {
      expect(loadTopLevelCommand({
        type: 'reply',
        choices: [ { key:'the-key', value: 'the-value'}]
      })).toBeInstanceOf(ReplyCommand);
    });
  })
});