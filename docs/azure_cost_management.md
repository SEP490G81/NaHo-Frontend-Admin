api thứ 1: get http://localhost:8386/api/v1/admin/azure-cost/summary
lấy cost của tháng hiện tại:

{

&#x20;   "meta": {

&#x20;       "traceId": "ca8a86e7-694d-4991-a203-659855669563",

&#x20;       "timestamp": "2026-08-13T13:05:11.875540400Z",

&#x20;       "pageMeta": null

&#x20; },

&#x20;   "message": "Lấy thông tin tổng quan chi phí Azure thành công!",

&#x20;   "data": {

&#x20;       "cost": 1.521533888888,

&#x20;       "currency": "USD",

&#x20;       "period": "MonthToDate"

&#x20; }

}

api thứ 2: http://localhost:8386/api/v1/admin/azure-cost/chart?timeframe=Last6Months\&granularity=Monthly

{

&#x20;   "meta": {

&#x20;       "traceId": "755835e3-7a58-4f3c-a62c-145fcc631ab4",

&#x20;       "timestamp": "2026-08-13T13:11:30.758387300Z",

&#x20;       "pageMeta": null

&#x20; },

&#x20;   "message": "Lấy dữ liệu biểu đồ chi phí Azure thành công!",

&#x20;   "data": {

&#x20;       "totalCost": 3.106686666668,

&#x20;       "currency": "USD",

&#x20;       "granularity": "Monthly",

&#x20;       "points": \[

&#x20; {

&#x20;               "dateOrMonth": "2026-05-01T00:00:00",

&#x20;               "cost": 0.259408333333,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "2026-06-01T00:00:00",

&#x20;               "cost": 0.465472222223,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "2026-07-01T00:00:00",

&#x20;               "cost": 0.860272222224,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "2026-08-01T00:00:00",

&#x20;               "cost": 1.521533888888,

&#x20;               "currency": "USD"

&#x20; }

&#x20;       ]

&#x20; }

}

http://localhost:8386/api/v1/admin/azure-cost/chart?timeframe=Custom\&granularity=Daily\&fromDate=2026-05-24\&toDate=2026-08-13

public class AzureCostChartRequest { private String timeframe; private String granularity; private String fromDate;
private String toDate; }

{

&#x20;   "meta": {

&#x20;       "traceId": "b9fd7a86-5124-4c75-a9c3-c1e31ab4375e",

&#x20;       "timestamp": "2026-08-13T13:09:41.094462800Z",

&#x20;       "pageMeta": null

&#x20; },

&#x20;   "message": "Lấy dữ liệu biểu đồ chi phí Azure thành công!",

&#x20;   "data": {

&#x20;       "totalCost": 1.521533888888,

&#x20;       "currency": "USD",

&#x20;       "granularity": "Daily",

&#x20;       "points": \[

&#x20; {

&#x20;               "dateOrMonth": "20260802",

&#x20;               "cost": 0.372666666667,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260803",

&#x20;               "cost": 0.063333333333,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260804",

&#x20;               "cost": 0.098222222222,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260805",

&#x20;               "cost": 0.122747222222,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260806",

&#x20;               "cost": 0.002888888889,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260807",

&#x20;               "cost": 0.054194444444,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260808",

&#x20;               "cost": 0.100666666667,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260809",

&#x20;               "cost": 0.076444444444,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260811",

&#x20;               "cost": 0.229422222222,

&#x20;               "currency": "USD"

&#x20; },

&#x20; {

&#x20;               "dateOrMonth": "20260812",

&#x20;               "cost": 0.400947777778,

&#x20;               "currency": "USD"

&#x20; }

&#x20;       ]

&#x20; }

}
