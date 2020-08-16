import { random } from "../js";

it("sukeko", () => {
  // console.log(random(0, 100, 10));
  //console.log(random(0, 100, 10));
  const result = random(10, 100, 5);
  expect(result % 5).toBe(0);
  expect(result).toBeGreaterThanOrEqual(10);
  expect(result).toBeLessThanOrEqual(100);
});
