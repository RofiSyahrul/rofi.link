type SubmitterElement = HTMLButtonElement | HTMLInputElement;

const isSourceElementASubmitter = (
  sourceElement: Element | undefined,
): sourceElement is SubmitterElement => {
  return (
    (sourceElement instanceof HTMLElement &&
      'form' in sourceElement) ||
    !!sourceElement?.closest('form')
  );
};

class SubmitHandler {
  readonly #doc: Document;

  #spinner: HTMLSpanElement | null = null;
  #submitter: SubmitterElement | null = null;

  constructor(doc: Document) {
    this.#doc = doc;
  }

  public start(submitter: SubmitterElement) {
    const spinner = this.#doc.createElement('span');
    spinner.classList.add('spinner');

    submitter.prepend(spinner);
    submitter.disabled = true;

    this.#spinner = spinner;
    this.#submitter = submitter;
  }

  public stop() {
    if (this.#spinner && this.#submitter) {
      this.#spinner.remove();
      this.#spinner = null;
      this.#submitter.disabled = false;
      this.#submitter = null;
    }
  }
}

class ProgressBar {
  readonly #INTERVAL = 50;
  readonly #MAX = 100;
  readonly #STEP = 15;

  readonly #doc: Document;

  #el: HTMLProgressElement | null = null;
  #intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(doc: Document) {
    this.#doc = doc;
  }

  get #element(): HTMLProgressElement {
    if (this.#el) return this.#el;
    this.#el = this.#doc.createElement('progress');
    return this.#el;
  }

  #getIncrementFactor(value: number): number {
    return ((this.#MAX - value) * this.#STEP) / this.#MAX;
  }

  public start() {
    clearInterval(this.#intervalId);

    const element = this.#element;
    element.max = this.#MAX;
    element.value = 0;
    element.classList.add('bar');
    this.#doc.body.append(element);

    this.#intervalId = setInterval(() => {
      element.value +=
        Math.random() * this.#getIncrementFactor(element.value);
    }, this.#INTERVAL);
  }

  public stop() {
    clearInterval(this.#intervalId);
    const element = this.#element;
    element.value = this.#MAX;
    element.remove();
    this.#el = null;
  }
}

const init = (win: Window, doc: Document) => {
  const progressBar = new ProgressBar(doc);
  const submitHandler = new SubmitHandler(doc);

  let isTransitionTriggeredByForm = false;

  doc.addEventListener('astro:before-preparation', event => {
    const originalLoader = event.loader;
    const sourceElement = event.sourceElement;

    event.loader = async () => {
      if (isSourceElementASubmitter(sourceElement)) {
        submitHandler.start(sourceElement);
        isTransitionTriggeredByForm = true;
      } else {
        isTransitionTriggeredByForm =
          sourceElement instanceof HTMLFormElement;
      }

      progressBar.start();
      await originalLoader();
      submitHandler.stop();
      progressBar.stop();
    };
  });

  doc.addEventListener('astro:after-swap', () => {
    const { scrollX, scrollY } = win.history.state ?? {};
    if (
      isTransitionTriggeredByForm &&
      typeof scrollX === 'number' &&
      typeof scrollY === 'number'
    ) {
      win.scroll(scrollX, scrollY);
      isTransitionTriggeredByForm = false;
    }
  });
};

init(window, document);
