import { identity } from "@std"

export type Redirect = {
  host: string
  destination: `https://${string}`
}

export const Redirect = identity<Redirect>
