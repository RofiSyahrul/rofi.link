import type { z } from 'astro/zod';
import { ActionError, ActionInputError } from 'astro:actions';

export class CustomActionInputError<
  T extends Record<string, any>,
> extends ActionInputError<T> {
  constructor(
    public input: T,
    fields: z.ZodError<T>['formErrors']['fieldErrors'],
    code?: ActionError['code'],
  ) {
    super([]);
    this.name = 'CustomActionInputError';
    this.fields = fields;
    this.#updateCodeAndStatus(code);
    this.#updateMessage();
  }

  #updateCodeAndStatus(code?: ActionError['code']) {
    if (code) {
      this.code = code;
      this.status = ActionError.codeToStatus(code);
    }
  }

  #updateMessage() {
    const messages: string[] = [];
    const fieldMessagesList = Object.values(this.fields);

    for (const fieldMessages of fieldMessagesList) {
      if (Array.isArray(fieldMessages)) {
        const fieldMessage = fieldMessages.join('; ');
        if (fieldMessage) messages.push(fieldMessage);
      }
    }

    if (messages.length > 0) {
      this.message = messages.join(';; ');
    }
  }

  public static hasInstance<T extends Record<string, any>>(
    instance?: ActionError<T>,
  ): instance is CustomActionInputError<T> {
    return instance instanceof this;
  }
}

export class CustomActionError<
  T extends Record<string, any>,
> extends ActionError<T> {
  constructor(
    public input: T,
    message: string,
    code: ActionError['code'] = 'INTERNAL_SERVER_ERROR',
  ) {
    super({ code, message });
    this.name = 'CustomActionError';
  }

  public static hasInstance<T extends Record<string, any>>(
    instance?: ActionError<T>,
  ): instance is CustomActionError<T> {
    return instance instanceof this;
  }
}
