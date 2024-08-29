export type Failure<C, T> = {
  _tag: "Failure"
  cause: C
}

export type Success<C, T> = {
  _tag: "Success"
  value: T
}


export type Result<C, T> = Failure<C, T> | Success<C, T>

export const Failure = <T>(cause: T): Failure<T, never> => {
  return {
    _tag: "Failure",
    cause,
  };
}

export const Success = <T>(value: T): Success<never, T> => {
  return {
    _tag: "Success",
    value,
  };
}

export const isSuccess = <C, T>(result: Result<C, T>): result is Success<C, T> => {
  return result._tag === "Success";
} 

export const match =
  <C, T, D, R>(options: {
    onFailure: (cause: C) => D
    onSuccess: (value: T) => R
  }) =>
  (result: Result<C, T>): D | R => {
    if (result._tag === "Failure") {
      return options.onFailure(result.cause);
    } else {
      return options.onSuccess(result.value);
    }
  }
