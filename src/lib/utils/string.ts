type RawFn = typeof String.raw;

const oneLiner = (sep: string, ...args: Parameters<RawFn>) => {
  return String.raw(...args).replaceAll(/[\t\n\r]+\s*/g, sep);
};

export const oneLine: RawFn = (...args) => oneLiner(' ', ...args);
