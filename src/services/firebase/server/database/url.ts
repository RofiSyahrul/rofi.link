import { DEFAULT_LIMIT } from '@/constants/pagination';
import type { UrlModel, AddUrlParam, GetUrlListParam, UpdateUrlParam } from '@/types/url-model';

import { FirebaseAdmin } from '../_base';
import { getList, getChildValue, joinPath, getChildKey } from './_utils';

const database = FirebaseAdmin.db;
const path = '/urls';

function getRef(pathSuffix?: string) {
  const finalPath = joinPath(path, pathSuffix);
  return database.ref(finalPath);
}

export const url = {
  async getSnapshotBySlug(slug: string) {
    const ref = getRef();
    const snapshot = await ref.orderByChild('slug').equalTo(slug).once('value');
    return { snapshot, ref };
  },

  async getRefBySlug(slug: string) {
    const { ref, snapshot } = await this.getSnapshotBySlug(slug);
    const key = getChildKey(snapshot);
    if (!key) return null;
    return ref.child(key);
  },

  async getList({ sorter = 'createdAt', limit = DEFAULT_LIMIT }: GetUrlListParam = {}) {
    const ref = getRef();
    const snapshot = await ref.orderByChild(sorter).limitToLast(limit).once('value');
    return getList<UrlModel>(snapshot);
  },

  async getMyURLs(userID: string) {
    const ref = getRef();
    const snapshot = await ref.orderByChild('user').equalTo(userID).once('value');
    return getList<UrlModel>(snapshot);
  },

  async get(slug: string): Promise<UrlModel | null> {
    const { snapshot } = await this.getSnapshotBySlug(slug);
    return getChildValue(snapshot);
  },

  async isAvailable(slug: string): Promise<boolean> {
    const value = await this.get(slug);
    return !value;
  },

  async add(param: AddUrlParam) {
    const ref = getRef();
    const now = new Date().toISOString();

    const data: UrlModel = {
      ...param,
      hit: 0,
      createdAt: now,
      updatedAt: now
    };

    return await ref.push(data);
  },

  async update(slug: string, param: UpdateUrlParam) {
    const ref = await this.getRefBySlug(slug);
    if (!ref) return null;

    const data: Partial<UrlModel> = {
      ...param,
      updatedAt: new Date().toISOString()
    };

    return await ref.update(data);
  },

  async remove(slug: string) {
    const ref = await this.getRefBySlug(slug);
    if (!ref) return null;
    return await ref.remove();
  }
};
