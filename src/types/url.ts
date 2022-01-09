export type UrlModel = {
  id: string;
  actual_url: string;
  slug: string;
  hit: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  user?: unknown;
  user_id?: string | null;
};

export type Url = {
  id: string;
  actualUrl: string;
  slug: string;
  hit: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  user?: unknown;
  userId?: string | null;
};

export type GetUrlBySlugReturn = Pick<Url, 'id' | 'actualUrl' | 'slug' | 'hit'>;

export type ShortenNewUrlParam = Pick<Url, 'actualUrl' | 'slug' | 'userId'>;

export type MetaData = {
  page: number;
  pageSize: number;
  totalData: number;
};

export type GetUrlByUserIdReturn = {
  data: Url[];
  meta: MetaData;
};
