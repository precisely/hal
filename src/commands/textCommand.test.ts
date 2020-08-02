import { TextCommand } from "commands/textCommand";

describe('TextCommand', function () {
  describe('.make', function () {
    describe('given a string', function () {
      const command = TextCommand.make('foo')
      it('should return a TextCommand', function () {
        expect(command).toBeInstanceOf(TextCommand);
      });
      it('should contain the given string in the text property', function () {
        expect(command?.text).toEqual('foo');
      })
    });
    describe('given an object', function () {
      const command = TextCommand.make({
        text: 'foo',
        typingSpeed: 100,
        typing: true
      })
      it('should return a TextCommand', function () {
        expect(command).toBeInstanceOf(TextCommand);
      });
      it('should contain the given string in the text property', function () {
        expect(command?.text).toEqual('foo');
      });
      it('should contain the other given properties', function () {
        expect(command?.typing).toEqual(true);
        expect(command?.typingSpeed).toEqual(100);
      });
    });

    describe('given various incorrect inputs', function () {
      it('should return undefined for null', function () {
        expect(TextCommand.make(null)).toBeUndefined();
      });
      it('should return undefined for a number', function () {
        expect(TextCommand.make(123)).toBeUndefined();
      });
      it('should be undefined if the type key is not "text"', function () {
        expect(TextCommand.make({ type: 'other', text: 'hello'})).toBeUndefined();
      });
    });
  });
});