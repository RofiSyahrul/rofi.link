const convertToSingleLine = (
  multilineString: TemplateStringsArray,
  withoutSpace?: boolean
): readonly string[] => {
  const replacedWith = withoutSpace ? '' : ' ';
  return multilineString.raw.map((str) => str.replace(/[\n\r]+ */g, replacedWith));
};

export const singleLine = (multilineString: TemplateStringsArray, ...values: any[]): string => {
  const stringArray: readonly string[] = convertToSingleLine(multilineString);
  return String.raw({ raw: stringArray }, ...values);
};

export const singleLineWithoutSpace = (
  multilineString: TemplateStringsArray,
  ...values: any[]
): string => {
  const stringArray: readonly string[] = convertToSingleLine(multilineString, true);
  return String.raw({ raw: stringArray }, ...values);
};
