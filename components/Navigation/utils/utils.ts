export const createUrlTarget = (type: string, uri: string, target: string) => {
  if (type !== uri) {
    return "_self";
  }
  return target;
};