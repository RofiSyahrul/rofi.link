export default function parse<T>(text: string) {
  try {
    return JSON.parse(text) as T;
  } catch (error) {
    return null;
  }
}
