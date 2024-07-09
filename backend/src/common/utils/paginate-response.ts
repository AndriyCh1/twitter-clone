export interface PaginatedResponseData<T> {
  data: T[];
  pagination: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export const paginate = <T>(
  data: T[],
  totalRecords: number,
  currentPage: number,
  pageSize: number
): PaginatedResponseData<T> => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  return {
    data,
    pagination: {
      totalRecords,
      totalPages,
      currentPage,
      pageSize,
    },
  };
};
