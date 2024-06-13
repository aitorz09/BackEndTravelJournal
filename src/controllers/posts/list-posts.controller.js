import { listPostsModel } from "../../models/posts/index.js";

export default async function listPostController(req, res, next) {
  try {

    const currentUser = req.currentUser;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    const { postsWithDetail: posts, total } = await listPostsModel(currentUser, limit, offset)

    return res.status(200).json({
      ok: true,
      total,
      posts,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}