const { describe } = require("mocha");

const { deepStrictEqual, ok } = require("assert");

const mapCell = require("./mapCell");

describe("Map Cell spec", () => {
  describe("if the object has a value with a url", () => {
    const object = {
      value: {
        hyperlink: "https://agibank.atlassian.net/browse/PGTO-1368",
        text: "PGTO-1368",
      },
    };

    it("Then, should be a text value returned", () => {
      const result = mapCell(object);

      deepStrictEqual(
        result,
        "PGTO-1368",
        "The returned value is different in mapCell hyperlink"
      );
    });
  });

  describe("If the object has not a value with url,", () => {
    const object = {
      value: "22/10/2021",
    };

    it("Then should return the value", () => {
      const result = mapCell(object);

      deepStrictEqual(
        result,
        "22/10/2021",
        "The returned value is different in mapCell simple"
      );
    });

    describe('and the value is length zero', () => {
        const object = {
            value: "",
          };

          it("Then should return the value with length 0", () => {
            const result = mapCell(object);
      
            deepStrictEqual(
              result.length,
              0,
              "The returned value is filled when should be empty"
            );
          });
    })
  });
});
