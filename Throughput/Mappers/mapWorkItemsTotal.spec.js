const { deepStrictEqual, ok } = require("assert");
const { mapWorkItemsTotal } = require("./mapWorkItemsTotal");

describe("MapWorkItemsTotal spec", () => {
  const rows = [
    { Resolved: new Date("11/24/2020") },
    { Resolved: new Date("11/16/2020") },
    { Resolved: new Date("04/12/2020") },
  ];

  describe("When the period for evaluation be one week", () => {
    it("Then the result will be the with 3 items", async () => {
      const result = await mapWorkItemsTotal({ rows, daysPeriod: 7 });

      deepStrictEqual(
        result.length,
        3,
        `The count result is different that expected 3=${result.length}`
      );
    });
  });

  describe("When the period for evaluation be two weeks", () => {
    it("Then the result will be the with 2 items", () => {
      const result = mapWorkItemsTotal({ rows, daysPeriod: 14 });
      deepStrictEqual(
        result.length,
        2,
        `The count result is different that expected 2=${result.length}`
      );
    });
  });
});
