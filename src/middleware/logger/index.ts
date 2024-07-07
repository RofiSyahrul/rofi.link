/* eslint-disable no-console */
import type { MiddlewareHandler } from 'astro';
import chalk from 'chalk';

type Tail<T extends any[]> = T extends [infer _A, ...infer R]
  ? R
  : never;

type ColorKey = keyof Pick<typeof chalk, 'blue' | 'red' | 'bgRed'>;

class Logger {
  #requestInfo: string;

  constructor(headers: Headers, url: URL) {
    this.#requestInfo = this.#stringifyObject({
      url,
      headers: [...headers.entries()],
    });
  }

  public info<TExtra extends Record<string, any>>(
    message: string,
    extra?: TExtra,
  ) {
    console.log(
      this.#chalkify(
        'blue',
        message,
        this.#requestInfo,
        this.#stringifyObject(extra),
      ),
    );
  }

  public error<TExtra extends Record<string, any>>(
    ...args: Tail<Parameters<typeof this.logErrorOrFatal<TExtra>>>
  ) {
    this.logErrorOrFatal('red', ...args);
  }

  public fatal<TExtra extends Record<string, any>>(
    ...args: Tail<Parameters<typeof this.logErrorOrFatal<TExtra>>>
  ) {
    this.logErrorOrFatal('bgRed', ...args);
  }

  private logErrorOrFatal<TExtra extends Record<string, any>>(
    colorKey: ColorKey,
    message: string,
    error: any,
    extra?: TExtra,
  ) {
    console.error(
      this.#chalkify(
        colorKey,
        message,
        error instanceof Error ? error : this.#stringifyObject(error),
        this.#requestInfo,
        this.#stringifyObject(extra),
      ),
    );
  }

  #chalkify(colorKey: ColorKey, ...args: (string | Error)[]) {
    return chalk[colorKey](args.join('\n'), '\n');
  }

  #stringifyObject(object: any) {
    if (object) {
      return JSON.stringify(object, null, 2);
    }
    return '';
  }
}

export type { Logger };

export const injectLogger: MiddlewareHandler = (ctx, next) => {
  ctx.locals.logger = new Logger(ctx.request.headers, ctx.url);
  return next();
};
