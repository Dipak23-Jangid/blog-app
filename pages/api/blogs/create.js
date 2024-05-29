import { apiHandler, blogsRepo } from "helpers/api";

export default apiHandler({
  post: create,
});

async function create(req, res) {
  console.log("API Blog Create", req.body);
  await blogsRepo.create(req, req.body);
  return res.status(200).json({});
}
