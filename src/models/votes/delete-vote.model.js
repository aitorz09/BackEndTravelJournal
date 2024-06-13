import getPool from "../../database/get-pool.js";
import { getVotes } from "../posts/getVotes.js";

export default async function deleteVoteModel(post, currentUser) {
  try {

    const pool = await getPool();

    await pool.query(
        `DELETE FROM votes
          WHERE postId = ? AND userId = ?`,
        [post.id, currentUser.id]
      )

      const {voteCount, voteCountDown, voteCountUp} = await getVotes(post)

 

    return { 
        message: `El voto fue eliminado exitosamente.`,
        voteCount,
        voteCountDown,
        voteCountUp
     }

  } catch (error) {
    throw error

  }
}