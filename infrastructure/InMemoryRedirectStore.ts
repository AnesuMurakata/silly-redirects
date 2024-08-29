import { Redirect, RedirectStore } from "../domain"
import { Success, Failure } from "../std/result"
import { RedirectNotConfigured } from "../domain"

class InMemoryRedirectStore implements RedirectStore {
  globalResult: Redirect[] = []

  set: RedirectStore["set"] = (value) => {
    this.globalResult.push(value)

    return () =>  Promise.resolve(Success(void 0))
  }

  getForPath: RedirectStore["getForPath"] = (path) => {
    return () => {
      const redirect = this.globalResult.find((r) => r.host === path);

      if (redirect) {
        return Promise.resolve(Success(redirect));
      } else {
        return Promise.resolve(Failure(RedirectNotConfigured.makeForPath(path)));
      }
    };
  }
}

const make = () => new InMemoryRedirectStore()
export { make as InMemoryRedirectStore }
