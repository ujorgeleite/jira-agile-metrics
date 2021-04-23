const { deepStrictEqual } = require("assert");

const mapLeadTimeByPeriod = require("./mapLeadTimeByPeriod");

describe("MapLeadTimeByPeriod Spec", () => {
  describe("Given that is received a file with many different status,", () => {
    describe("when the leadtime is mapped correctly,", () => {
      const leadTimeData = [
        {
          Key: "CONC-150",
          IssueType: "Story",
          Status: "InProgress",
          Month: 2,
          Year: 2021,
          LeadTime: 3,
          Created: "2021-03-16T09:34:22.239Z",
          Updated: "2021-02-16T09:34:44.371Z",
          Resolved: "2021-03-19T03:25:00.560Z",
        },
        {
          Key: "CONC-149",
          IssueType: "Story",
          Status: "Done",
          Month: 1,
          LeadTime: 2,
          Year: 2021,
          Created: "2021-02-16T03:19:06.139Z",
          Updated: "2021-02-16T03:19:11.542Z",
          Resolved: "2021-02-19T03:25:00.560Z",
        },
        {
          Key: "CONC-147",
          IssueType: "Bug",
          Status: "ParaValidar",
          Month: 3,
          LeadTime: 1,
          Year: 2021,
          Created: "2021-02-10T06:18:15.966Z",
          Updated: "2021-02-11T06:47:05.316Z",
          Resolved: "2021-04-19T03:25:00.560Z",
        },
        {
          Key: "CONC-144",
          IssueType: "Story",
          Status: "ParaValidar",
          Month: 4,
          LeadTime: 9,
          Year: 2021,
          Created: "2021-02-09T09:15:51.199Z",
          Updated: "2021-02-16T03:20:09.222Z",
          Resolved: "2021-05-19T03:25:00.560Z",
        },
      ];

      const result = mapLeadTimeByPeriod(leadTimeData);

      it("then the result is one item in the list", () => {
        deepStrictEqual(
          result.length,
          4,
          "The list returned for mapLeadtimeByTime is not one"
        );
      });

      it("then the result is one item equal by expected", () => {
        const expected = [
          {
            month: 2,
            year: 2021,
            period: "3-2021",
            quantidadeItens: 1,
            businessLeadTime: 3,
          },
          {
            month: 1,
            year: 2021,
            period: "2-2021",
            quantidadeItens: 1,
            businessLeadTime: 2,
          },
          {
            month: 3,
            year: 2021,
            period: "4-2021",
            quantidadeItens: 0,
            businessLeadTime: 0,
          },
          {
            month: 4,
            year: 2021,
            period: "5-2021",
            quantidadeItens: 1,
            businessLeadTime: 9,
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
