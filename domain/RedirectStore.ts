import { R, T } from "@std"
import { Redirect } from "./Redirect"

export interface RedirectStore {
  set: (value: Redirect) => T.Task<R.Result<Error, void>>
  getForPath: (
    path: string,
  ) => T.Task<R.Result<Error | RedirectNotConfigured, Redirect>>
}

export class RedirectNotConfigured {
  constructor(public path: string) {}

  static makeForPath = (path: string) => new RedirectNotConfigured(path)

  static _tag: "RedirectNotConfigured"
}
