export const STORE_TOKEN = 'STORE_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const storeToken = (token) => ({
  type: STORE_TOKEN,
  payload: token
});

export const removeToken = () => ({
  type: REMOVE_TOKEN
});
