import {addVoteModel, deleteVoteModel} from "../../models/votes/index.js";
import verifyPost from "../../validations/verify-post.js";

export default async function addVoteController(req, res, next) {
  try {

    const currentUser = req.currentUser;
    const post = await verifyPost(req.params.idPost);

    const {message, voteCount, voteCountDown, voteCountUp} = await deleteVoteModel(post,currentUser)

    return res.status(200).json({
      ok: true,
      message,
      voteCount,
      voteCountDown,
      voteCountUp
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}