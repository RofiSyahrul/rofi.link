export function logError(fnName: string, error: any) {
  // eslint-disable-next-line no-console
  console.log(`ERROR libs/supabase at function ${fnName}:`, error);
}
