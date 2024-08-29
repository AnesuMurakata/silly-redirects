import { beforeAll, expect, it } from "bun:test"

let response: Response
 
beforeAll(async () => {
  response = await fetch("http://localhost:3000", {
    headers: {
      host: "my.domain.tld",
    },
    redirect: "manual",
  })
})

it("returns a redirect", () => {
  expect(response.redirected).toBe(true)
  expect(response.headers.get("location")).toBe("https://seekdharma.com")
})
