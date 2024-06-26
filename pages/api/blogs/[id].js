import { apiHandler, blogsRepo } from "helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const blog = await blogsRepo.getById(req.query.id);
  if (!blog) throw "Blog Not Found";
  return res.status(200).json(blog);
}

async function update(req, res) {
  const { id } = req.query;
  await blogsRepo.update(req, id, req.body);
  //await blogsRepo.update(req.query.id, req.body);
  return res.status(200).json({});
}

async function _delete(req, res) {
  const { id } = req.query;
  await blogsRepo.delete(req, id);
  //await blogsRepo.delete(req.query.id);
  return res.status(200).json({});
}
