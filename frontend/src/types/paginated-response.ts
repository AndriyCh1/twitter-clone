export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}
