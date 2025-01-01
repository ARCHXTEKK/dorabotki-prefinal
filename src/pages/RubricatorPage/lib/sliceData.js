export const sliceData = (data, page, pageSize) => {
  return data.slice(pageSize * page, pageSize * (page + 1));
};
