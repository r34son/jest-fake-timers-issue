import { describe, expect, test, jest } from "@jest/globals";
import { sum } from "./sum";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(1000);
    expect(sum(1, 2)).toBe(3);
  });
});
