import { apiHandler, blogsRepo } from "helpers/api";
export default apiHandler({
  get: getAllPublic,
});

async function getAllPublic(req, res) {
  const blogs = await blogsRepo.getAllPublic(req);
  return res.status(200).json(blogs);
}
