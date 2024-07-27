export interface RecaptchaInstance {
  ready: (callback: () => void) => void;

  execute: (
    siteKey: string,
    options: { action: string },
  ) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: RecaptchaInstance;
  }
}
