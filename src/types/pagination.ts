export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationQueries {
  page?: number;
  take?: number;
  sortOrder?: string;
  sortBy?: string;
}
