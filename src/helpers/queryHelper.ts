export const parseQuery = (url: string) => {
  return url.replace(/[/?]/g, '').split('&').reduce((acc: { [a :string] : string }, curr: string) => {
    const keyVal = curr.split('=');
    if (keyVal.length === 2) acc[keyVal[0]] = keyVal[1];
    return acc;
  }, {})
};
