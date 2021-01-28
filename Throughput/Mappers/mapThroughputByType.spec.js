const mapThroughputByType = require("./mapThroughputByType");
const { deepStrictEqual } = require("assert");

describe("MapThroughptuByType Spec", () => {
  const data = {
    finalDate: new Date("01-21-2021"),
    throughput: 7,
    items:[
    { IssueType: "Story" },
    { IssueType: "Bug" },
    { IssueType: "Story" },
    { IssueType: "Task" },
    { IssueType: "Story" },
    { IssueType: "Task" },
    { IssueType: "Bug" },
  ]
};


  const issueTypes = ["Story", "Bug", "Task"];

  describe("Given that the list has 3 types of items", () => {
    const results = mapThroughputByType(data,issueTypes);
    const resultString = `{${results}}`
    const expected = '{"1/21/2021": {"Story":3,"Bug":2,"Task":2,"Throughput": 7}}'
    

    it("Then the return will the same of expected", () => {
      deepStrictEqual(
        resultString,
        expected ,
        "The result of items in mapThroughputByType is different"
      );
    });

    
  });
});
