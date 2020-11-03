
export function getRedirectPath() {
}

export function test() {
}

export function getUrlToken(path, queryKey) {
  let res = '';
  if (!!~path.indexOf(queryKey)) {
    res = path.split(`${queryKey}=`)[1];
  }
  return res;
}
