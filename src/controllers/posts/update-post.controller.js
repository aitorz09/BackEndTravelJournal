import {updatePostModel} from "../../models/posts/index.js";
import verifyOwner from "../../validations/verify-owner.js";
import verifyPost from "../../validations/verify-post.js";

export default async function listPostController(req, res, next) {
    try {

        const currentUser = req.currentUser;
    
        const post = await verifyPost(req.params.idPost);
    
        verifyOwner(post, currentUser);
    
        const { title = post.title, description = post.description, tags } = req.body;
    

        const {message} = await updatePostModel(post, title, description, tags)

        return res.status(200).json({
          ok: true,
          message,
        })
    
      } catch (error) {
        console.log(error);
        next(error);
      }
}