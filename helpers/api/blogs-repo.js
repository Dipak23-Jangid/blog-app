import getConfig from "next/config";
//import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "helpers/api";
import { getUserFromToken } from "helpers/api";
//import { getUserFromToken } from "helpers/api/getUserFromToken";
const { serverRuntimeConfig } = getConfig();
export const blogsRepo = {
  getAllPublic,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAllPublic(req) {
  console.log("======= Blog getAllPublic =======");
  return await db.Blog.findAll({
    order: [["timestamp", "DESC"]],
  });
}

async function getAll(req) {
  const userId = getUserFromToken(req);
  console.log("======= Blog GetAll =======", userId);
  return await db.Blog.findAll({ where: { userId } });
}

async function getById(id) {
  return await db.Blog.findByPk(id);
}

async function create(req, params) {
  const userId = getUserFromToken(req);
  console.log("======= Blog Create =======", userId);
  params.userId = userId;
  console.log("Param ", params);
  const blog = new db.Blog(params);
  await blog.save();
}

async function update(req, id, params) {
  const user = getUserFromToken(req);
  const blog = await db.Blog.findByPk(id);

  // validate
  if (!blog) throw "blog not found";
  // copy params properties to user
  Object.assign(blog, params);

  await blog.save();
}

async function _delete(req, id) {
  const blog = await db.Blog.findByPk(id);
  if (!blog) throw "Blog not found";

  // delete user
  await blog.destroy();
}
