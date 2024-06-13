import {updateCommentModel } from "../../models/comments/index.js";
import validateCreateComment from "../../validations/validate-create-comment.js";
import verifyComment from "../../validations/verify-comment.js";
import verifyOwner from "../../validations/verify-owner.js";

export default async function updateCommentControlller(req, res, next) {
    try {

        const { message } = validateCreateComment(req.body);
        const currentUser = req.currentUser;
    
        const comment = await verifyComment(req.params.idComment);
        verifyOwner(comment, currentUser);

        await updateCommentModel(message, comment)

        return res.status(200).json({
            ok: true,
            message: "Comentario actualizado con éxito",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}