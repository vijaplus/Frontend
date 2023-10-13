let globalCookies = "" ;

export function setCookies(cookies: string) {
  globalCookies = cookies;
}

export function getCookies() {
  return globalCookies;
}
