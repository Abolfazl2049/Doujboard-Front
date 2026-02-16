const multiplyArrLength = (arr: Array<any>, n: number) => {
  const res = [];
  for (let i = 0; i < n; i++) res.push(arr);
  return res.flat();
};

const cloneObject = <T extends Record<string, any>>(obj: T): T => {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
};
export { multiplyArrLength, cloneObject };
