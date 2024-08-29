import { beforeAll, describe, expect, it } from "bun:test"
import { RedirectNotConfigured, RedirectStore } from "./RedirectStore"
import { Redirect } from "./Redirect"
import { Failure, Success } from "../std/result"

export const suite = (name: string, factory: () => RedirectStore) => {
  describe(name, () => {
    describe("searching for a configured redirect", () => {
      const REDIRECT = Redirect({
        host: "www.domain.tld",
        destination: "https://my.new.website",
      })
      const store = factory()
      let r: Awaited<ReturnType<ReturnType<RedirectStore["getForPath"]>>>

      beforeAll(async () => {
        await store.set(REDIRECT)()
        r = await store.getForPath("www.domain.tld")()
      })

      it("succeeds with the configured redirect", () => {
        expect(r).toEqual(Success(REDIRECT))
      })
    })

    describe("searching for a non-configured redirect", () => {
      const store = factory()
      let r: Awaited<ReturnType<ReturnType<RedirectStore["getForPath"]>>>

      beforeAll(async () => {
        await store.set(
          Redirect({
            host: "www.domain.tld",
            destination: "https://my.new.website",
          }),
        )()
        r = await store.getForPath("missing.domain.tld")()
      })

      it("fails with a RedirectNotConfigured", () => {
        expect(r).toEqual(
          Failure(RedirectNotConfigured.makeForPath("missing.domain.tld")),
        )
      })
    })
  })
}
