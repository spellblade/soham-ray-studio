import { AsyncLocalStorage } from "node:async_hooks";

const als = new AsyncLocalStorage<{ request: Request }>();

export function runWithRequest<T>(request: Request, fn: () => T): T {
  return als.run({ request }, fn);
}

export function getRequest(): Request | undefined {
  return als.getStore()?.request;
}
