import type { DataSnapshot } from '@firebase/database-types';

export function joinPath(prefix: string, ...paths: (string | undefined | null)[]): string {
  let result = prefix;

  for (let index = 0; index < paths.length; index++) {
    const path = paths[index];
    if (!path) continue;

    const separator = path.startsWith('/') ? '' : '/';
    result += `${separator}${path}`;
  }

  return result;
}

export function getChildKey(snapshot: DataSnapshot): string | null {
  let key: string | null = null;
  snapshot.forEach((snap) => {
    ({ key } = snap);
    return true;
  });
  return key;
}

export function getChildValue<T>(snapshot: DataSnapshot): T | null {
  let value: T | null = null;
  snapshot.forEach((snap) => {
    value = snap.val();
    return true;
  });

  return value;
}

export function getList<T>(snapshot: DataSnapshot): T[] {
  const list: T[] = [];
  snapshot.forEach((snap) => {
    list.push(snap.val());
  });
  return list;
}
