import { ReplyCommand, ReplyChoice } from "./replyCommand";

describe('ReplyCommand', function () {
  describe('.make', function () {
    it('should return a ReplyCommand given a reply fragment with an array of two choices', function () {
      const command = ReplyCommand.make({
        type: 'reply',
        choices: [
          { text: 'foo'},
          { text: 'bar'}
        ]
      });
      expect(command).toBeInstanceOf(ReplyCommand);
      expect(command?.choices).toSatisfyAll(item => item instanceof ReplyChoice);
      expect(command?.choices[0]).toMatchObject({ text: 'foo', value: 'foo'});
      expect(command?.choices[1]).toMatchObject({ text: 'bar', value: 'bar'});
    });

    it('should return a ReplyCommand given a reply fragment with choices as key values', function () {
      const command = ReplyCommand.make({
        type: 'reply',
        choices: {
          foo: null,
          bar: null
        }
      });
      expect(command).toBeInstanceOf(ReplyCommand);
      expect(command?.choices).toSatisfyAll(item => item instanceof ReplyChoice);
      expect(command?.choices[0]).toMatchObject({ text: 'foo', value: 'foo'});
      expect(command?.choices[1]).toMatchObject({ text: 'bar', value: 'bar'});
    });

    it('should return a ReplyCommand with different text and value given the correct input', function () {
      const command = ReplyCommand.make({
        type: 'reply',
        choices: {
          foo: {
            text: 'Foo!!'
          },
          bar: {
            text: 'Bar!!'
          }
        }
      });
      expect(command).toBeInstanceOf(ReplyCommand);
      expect(command?.choices).toSatisfyAll(item => item instanceof ReplyChoice);
      expect(command?.choices[0]).toMatchObject({ text: 'Foo!!', value: 'foo'});
      expect(command?.choices[1]).toMatchObject({ text: 'Bar!!', value: 'bar'});
    });
  });
});
