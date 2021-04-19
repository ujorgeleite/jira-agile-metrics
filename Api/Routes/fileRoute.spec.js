const chai = require("chai");
const { expect } = chai;
const FormData = require("FormData");
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const api = require("../../api");

describe("FileRoute Tests", async function() {
  let app = {};
  this.beforeAll(async () => {
    app = await api;
  });

  this.afterAll(() => {
    app.stop();
  });

  it("List", async () => {
    const result = await app.inject({
      url: "/List",
      method: "GET",
    });

    const data = JSON.parse(result.payload);
    const expected = ["fileTest.xlsx"];

    expect(data).to.have.all.members(expected);
  });

  it("Download", async () => {
    const result = await app.inject({
      url: "/Download?fileName=Leadtime.xlsx",
      method: "GET",
    });

    const { res: { statusCode } } = result.raw;
    expect(statusCode).to.equal(200);
  });
});
