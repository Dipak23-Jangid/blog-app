import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "helpers";
import { alertService } from "./alert.service";
import { userService } from "services";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/blogs`;
const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

export const blogService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  getAllPublic,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};


async function getAllPublic() {
  //PublicAPI
  return await fetchWrapper.get(`${baseUrl}/all`);
}
async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

async function getById(id) {
  return await fetchWrapper.get(`${baseUrl}/${id}`);
}
async function create(params) {
  console.log("In Blog Service Create", baseUrl, params);
  return await fetchWrapper.post(`${baseUrl}/create`, params);
}

async function update(id, params) {
  await fetchWrapper.put(`${baseUrl}/${id}`, params);

  // update stored user if the logged in user updated their own record
  if (id === userSubject.value.id) {
    // update local storage
    const user = { ...userSubject.value, ...params };
    localStorage.setItem("user", JSON.stringify(user));

    // publish updated user to subscribers
    userSubject.next(user);
  }
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
  await fetchWrapper.delete(`${baseUrl}/${id}`);

  // auto logout if the logged in user deleted their own record
  if (id === userSubject.value.id) {
    logout();
  }
}
