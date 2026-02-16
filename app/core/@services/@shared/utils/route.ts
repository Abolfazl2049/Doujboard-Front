let deleteRouteQuery = (queryKey: string) => {
  const queries = useRoute().query;
  delete queries[queryKey];
  navigateTo({ query: queries, force: true, replace: true });
};


export { deleteRouteQuery };
