let deleteRouteQuery = (queryKey: string) => {
  const queries = useRoute().query;
  delete queries[queryKey];
  navigateTo({ query: queries, force: true, replace: true });
};
let removeRouteLocaleParams = (path: string) => {
  let formattedPath = path.replace("/fa-IR/", "/").replace("/en-GB/", "/");
  if (path === "/fa-IR" || path === "/en-GB") return "/";
  return formattedPath;
};

export { deleteRouteQuery, removeRouteLocaleParams };
