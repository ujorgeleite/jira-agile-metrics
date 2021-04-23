const { deepStrictEqual, ok } = require("assert");
const { BreakFromJiraFile } = require('./breakFile.js')

const path = require('path');
const srcDir = path.dirname(require.main.filename)+'/src/'

describe("BreakFile Spec", () => {
  it("Should get a multiple files from file", async () => {
    
    // const message = "Error to compare result and expected for breakfile From Jira";
    // const result = await BreakFromJiraFile(`../src/Files/Input/fileTest.xlsx`)

    // deepStrictEqual(result.length,1, message)
  });

  it("Should get a multiple files in a correct format", () => {
      
  });
});
