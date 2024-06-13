import { listsPostsByTagModel } from "../../models/posts/index.js";

export default async function listPostByTagController(req, res, next) {
  try {

    const currentUser = req.currentUser;
    const tag = req.params.tag || 1;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    const { postsWithDetail: posts, total } = await listsPostsByTagModel(currentUser,tag, limit, offset)

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