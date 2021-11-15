export type SortableUrlField = {
  slug: string;
  hit: number;
  createdAt: string;
  updatedAt: string;
};

export type UrlModel = SortableUrlField & {
  actualURL: string;
  users?: Record<string, boolean>;
};

export type AddUrlParam = Pick<UrlModel, 'slug' | 'actualURL' | 'users'>;

export type UpdateUrlParam = Partial<Pick<UrlModel, 'actualURL' | 'hit' | 'users'>>;

export type GetUrlListParam = PaginationParam<string | number> & {
  sorter?: keyof SortableUrlField;
};
