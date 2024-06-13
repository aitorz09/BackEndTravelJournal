import {addVoteModel} from "../../models/votes/index.js";
import verifyPost from "../../validations/verify-post.js";

export default async function addVoteController(req, res, next) {
  try {

    const currentUser = req.currentUser;
    const post = await verifyPost(req.params.idPost);
    const voteType = req.params.voteType || "positive";
    const voteCurrent = voteType == "negative" ? -1 : 1;

    const {message, voteCount, voteCountDown, voteCountUp, postVote} = await addVoteModel(post,currentUser,voteCurrent)

    return res.status(200).json({
      ok: true,
      message,
      voteCount,
      voteCountUp,
      voteCountDown,
      postVote
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}