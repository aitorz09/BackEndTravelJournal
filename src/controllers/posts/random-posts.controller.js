import { randomPostModel } from "../../models/posts/index.js";

export default async function randomPostsController(req, res, next) {
    try {

        const limit = req.query.limit

        const { posts } = await randomPostModel(limit)

        return res.status(200).json({
            ok: true,
            posts,
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}