import { describe, expect, it } from "bun:test"
import { identity } from "./identity"

it("returns the value it received", () => {
  expect(identity(5)).toBe(5)
})
