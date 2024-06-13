import { deleteCommentModel } from "../../models/comments/index.js";
import verifyComment from "../../validations/verify-comment.js";
import verifyOwner from "../../validations/verify-owner.js";

export default async function deleteCommentControlller(req, res, next) {
    try {   

        const currentUser = req.currentUser;

        const comment = await verifyComment(req.params.idComment);
        verifyOwner(comment, currentUser);

        const {message} = await deleteCommentModel(comment)

        return res.status(200).json({
            ok: true,
            message
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}