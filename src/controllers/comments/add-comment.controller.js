import { addCommentModel } from "../../models/comments/index.js";
import validateCreateComment from "../../validations/validate-create-comment.js";
import verifyPost from "../../validations/verify-post.js";

export default async function addCommentControlller(req, res, next) {
    try {

        const post = await verifyPost(req.params.idPost);
        const currentUser = req.currentUser;
    
        const { message } = validateCreateComment(req.body);

        const {comment} = await addCommentModel(message, post, currentUser)

        return res.status(200).json({
            ok: true,
            message: "Comentario agregado con éxito",
            comment
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}