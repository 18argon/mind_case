import { httpService } from '.';

const ACCESS_TOKEN_KEY = 'accessToken';

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const setAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN_KEY, token)

export const getBearerToken = () => `Bearer ${getAccessToken()}`;

export const logout = () => localStorage.setItem(ACCESS_TOKEN_KEY, null);

export const isAuthenticated = () => getAccessToken() !== null;

export const logIn = (username, password) => {
  return httpService
    .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      {
        username: username,
        password: password,
      },
    )
    .then((response) => response.data)
    .then((data) => {
      if (data.success) {
        setAccessToken(data.accessToken);
      }
    })
    .catch((err) => console.log({ err }));;
};

export const logOut = () => {
  return httpService
    .post(`${process.env.REACT_APP_BACKEND_URL}/auth/revoke`, {}, {})
    .then((response) => response.data)
    .then((result) => {
      if (result.success) {
        logout();
      }
    })
    .catch(err => console.log(err));
}
