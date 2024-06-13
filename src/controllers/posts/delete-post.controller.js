import {deletePostModel} from "../../models/posts/index.js";
import verifyOwner from "../../validations/verify-owner.js";
import verifyPost from "../../validations/verify-post.js";

export default async function listPostController(req, res, next) {
    try {

        const currentUser = req.currentUser;
    
        const post = await verifyPost(req.params.idPost);
    
        verifyOwner(post, currentUser);

        const {message} = await deletePostModel(post)

        return res.status(200).json({
          ok: true,
          message,
        })
    
      } catch (error) {
        console.log(error);
        next(error);
      }
}