# Silly Redirects

The goal of that project is to create a redirect app that you can point any domain to at the DNS level like so:

```
talent      CNAME       app.hosted.somewhere.tld.      900 
```

and then configure so that it recognizes which hostname it's been called from and, if configured, redirects to a specified destination.

We will be using Typescript and creating some utility types along the way.

## Setup

Let's start by installing bun, which we'll use to run our project: 

```
curl -fsSL https://bun.sh/install | bash
```

Then install our dependencies:

```
bun install
```

## Exercise 1: make the test suite of our stdlib pass!

```
bun test std/
```

## Exercise 2: add a test for R.match... and make it pass!

```
bun test std/
```

## Exercise 3: implement our domain!

The test suite has already been written, we need to make it pass / improve it

```
bun test infrastructure/
```

## Use our domain to implement our project (make our e2e tests pass!)

```
bun test tests/
```