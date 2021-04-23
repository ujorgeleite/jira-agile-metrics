const { deepStrictEqual } = require("assert");
const mapIssueTypes = require("./mapIssueTypes");

describe("MapIssueTypes spec", () => {
  describe("Given that has a mutiple types in array", () => {
    const types = [
      { IssueType: "Story" },
      { IssueType: "Story" },
      { IssueType: "Task" },
      { IssueType: "Story" },
      { IssueType: "Spike" },
      { IssueType: "It Support" },
    ];
    it("Should be a single type of status by type", () => {
      const result = mapIssueTypes(types);
      const expect = ["Story", "Task", "Spike", "It Support"];

      deepStrictEqual(
        result,
        expect,
        "Result expected for issue types is not equal"
      );
    });
  });
});
