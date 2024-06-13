import {showPostModel} from "../../models/posts/index.js";
import verifyPost from "../../validations/verify-post.js";

export default async function showPostController(req,res,next) {
    try {

        const idPost = req.params.idPost
        const currentUser = req.currentUser
       
        await verifyPost(idPost);

        const {post}= await showPostModel(idPost, currentUser)
    
        return res.status(200).json({
          ok: true,
          post,
        });
    
      } catch (error) {
        console.log(error);
        next(error);
      }
}