export type SortableUrlField = {
  slug: string;
  hit: number;
  createdAt: string;
  updatedAt: string;
};

export type UrlModel = SortableUrlField & {
  actualURL: string;
  user?: string;
};

export type AddUrlParam = Pick<UrlModel, 'slug' | 'actualURL' | 'user'>;

export type UpdateUrlParam = Partial<Pick<UrlModel, 'actualURL' | 'hit' | 'slug'>>;

export type GetUrlListParam = PaginationParam<string | number> & {
  sorter?: keyof SortableUrlField;
};
