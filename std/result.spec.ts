import { describe, expect, it } from "bun:test"
import { Failure, Success, isSuccess, match } from "./result"
import assert from "assert"
import { pipe } from "./pipe"

describe("Success", () => {
  const success = Success("something")

  it("is a success", () => {
    expect(isSuccess(success)).toBe(true)
  })

  it("holds the expected value", () => {
    assert(isSuccess(success), "success was NOT a success")
    expect(success.value).toBe("something")
  })
})

describe("Failure", () => {
  const failure = Failure(5)

  it("is not a success", () => {
    expect(isSuccess(failure)).toBe(false)
  })

  it("holds the expected cause", () => {
    assert(!isSuccess(failure), "failure WAS a success")
    expect(failure.cause).toBe(5)
  })
})

describe("Match", () => {
  it("should handle Success correctly", () => {
    const result = Success("Hello, World!");
    const output = match({
      onFailure: (cause: string) => `Failed: ${cause}`,
      onSuccess: (value: string) => `Success: ${value}`,
    })(result);

    expect(output).toBe("Success: Hello, World!");
  });

  it("should handle Failure correctly", () => {
    const result = Failure("Something went wrong");
    const output = pipe(result, match({
      onFailure: (cause) => `Failed: ${cause}`,
      onSuccess: (value) => `Success: ${value}`,
    }));

    expect(output).toBe("Failed: Something went wrong");
  });
});

describe.todo("match test!")
