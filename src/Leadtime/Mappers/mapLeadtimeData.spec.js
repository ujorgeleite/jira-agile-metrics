const { deepStrictEqual } = require("assert");

const mapLeadtimeData = require("./mapLeadtimeData");

describe("MapLeadTime Spec", () => {
  describe("Given that is received a file with many different status,", () => {
    describe("when the leadtime is mapped correctly,", () => {
      const data = {
        rows: [
          {
            Key: "CONC-150",
            IssueType: "Story",
            Status: "InProgress",
            Created: "2021-02-16T09:34:22.239Z",
            Updated: "2021-02-16T09:34:44.371Z",
          },
          {
            Key: "CONC-149",
            IssueType: "Story",
            Status: "Done",
            Created: "2021-02-16T03:19:06.139Z",
            Updated: "2021-02-16T03:19:11.542Z",
            Resolved: "2021-02-19T03:25:00.560Z",
          },
          {
            Key: "CONC-147",
            IssueType: "Bug",
            Status: "ParaValidar",
            Created: "2021-02-10T06:18:15.966Z",
            Updated: "2021-02-11T06:47:05.316Z",
          },
          {
            Key: "CONC-144",
            IssueType: "Story",
            Status: "ParaValidar",
            Created: "2021-02-09T09:15:51.199Z",
            Updated: "2021-02-16T03:20:09.222Z",
          },
        ],
      };

      const result = mapLeadtimeData(data);

      it("then the result is one item in the list", () => {
        deepStrictEqual(
          result.length,
          1,
          "The list returned for mapLeadtimeData is not one"
        );
      });

      it("then the result is one item equal by expected", () => {
        const expected = [
          {
            IssueType: "Story",
            Created: "2021-02-16T03:19:06.139Z",
            Start: "2021-02-16T03:19:06.139Z",
            Key: "CONC-149",
            LeadTime: 3,
            Month: 1,
            Year: 2021,
            Resolved: "2021-02-19T03:25:00.560Z",
          },
        ];

        deepStrictEqual(
          result,
          expected,
          "The list returned for mapLeadtimeData is not equal expected"
        );
      });
    });
  });
});
