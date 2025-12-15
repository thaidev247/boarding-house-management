import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "2m", target: 500 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"], // <1% lỗi
    http_req_duration: ["p(95)<500"], // p95 < 500ms
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:8000";

export default function () {
  const res = http.get(`${BASE_URL}/rooms`);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
