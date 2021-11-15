let count = 0;

export default function getDefaultId() {
  // eslint-disable-next-line no-plusplus
  return `default-id-${++count}`;
}
