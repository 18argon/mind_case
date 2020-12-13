import { httpService } from '.';
import { getBearerToken } from './auth-service';

const getRequestOptions = () => {
  return {
    headers: {
      Authorization: getBearerToken(),
    },
  }
}

export const fetchUsers = () => {
  return httpService
    .get(`${process.env.REACT_APP_BACKEND_URL}/users`, getRequestOptions())
    .then(request => request.data);
}

export const toggleUserAccessLevel = (id) => {
  return httpService
    .put(
      `${process.env.REACT_APP_BACKEND_URL}/users/${id}/activated`,
      {},
      getRequestOptions(),
    )
    .then(request => request.data)
}

export const fetchUser = (id) => {
  return httpService
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, getRequestOptions())
    .then(request => request.data);
};

export const fetchProfile = (id) => {
  return httpService
    .get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, getRequestOptions())
    .then(request => request.data);
};

export const updateUser = (id, fullName, newAvatar) => {
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("avatar", newAvatar[0]);

  const requestOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getBearerToken(),
    },
  };
  return httpService
    .put(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, formData, requestOptions)
    .then((response) => response.data);
}

export const updateProfile = (fullName, newAvatar) => {
  const formData = new FormData();
  formData.append("fullName", fullName);
  formData.append("avatar", newAvatar[0]);

  const requestOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: getBearerToken(),
    },
  };
  return httpService
    .put(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, formData, requestOptions)
    .then((response) => response.data);
}

// export const updateProfile = (fullName, newAvatar) => {
//   const formData = new FormData();
//   formData.append("fullName", fullName);
//   formData.append("avatar", newAvatar[0]);
//
//   const requestOptions = {
//     headers: {
//       "Content-Type": "multipart/form-data",
//       Authorization: getBearerToken(),
//     },
//   };
//   return httpService
//     .put(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, formData, requestOptions)
//     .then((response) => response.data);
// }

export function createUser(email, cpf, fullName, password, avatar) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("cpf", cpf);
  formData.append("fullName", fullName);
  formData.append("password", password);
  formData.append("avatar", avatar[0]);

  const requestOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  return httpService
    .post(`${process.env.REACT_APP_BACKEND_URL}/users`, formData, requestOptions)
    .then((response) => response.data);
}

