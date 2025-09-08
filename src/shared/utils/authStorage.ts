const KEYS = {
  token: 'access_token',
  name: 'user_name',
} as const;

function safeGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string | null) {
  if (value) sessionStorage.setItem(key, value);
  else sessionStorage.removeItem(key);
}

export const authStorage = {
  getToken: () => safeGet(KEYS.token),
  setToken: (token: string | null) => safeSet(KEYS.token, token),
  getName: () => safeGet(KEYS.name),
  setName: (name: string | null) => safeSet(KEYS.name, name),
};
