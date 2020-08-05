import { Dialog } from "dialog";

describe('Dialog', function () {
  describe('.make', function () {
    describe('given a minimal dialog definition', function () {
      const dialog = Dialog.make({
        topLevel: true,
        do: [],
        params: {
          foo: {
            type: "string",
            required: false
          },
          bar: {
            type: "number"
          }
        }
      });
      it('should return a Dialog instance', function () {
        expect(dialog).toBeInstanceOf(Dialog);
      });
      it('should contain an empty array for commands', function () {
        expect(dialog.commands).toBeArrayOfSize(0);
      });
      it('should contain definitions of the two params', function () {
        expect(dialog.params).toBeObject();
        expect(Object.keys(dialog.params)).toContainAllValues(['foo','bar']);
      });
    });

  });
});