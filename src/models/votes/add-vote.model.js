import getPool from "../../database/get-pool.js";
import { getVote } from "../posts/getVote.js";
import { getVotes } from "../posts/getVotes.js";

export default async function addVoteModel(post, currentUser, voteCurrent) {
  try {

    const pool = await getPool();

    const [[vote]] = await pool.query(
        `SELECT * FROM votes
        WHERE postId = ? AND userId = ?`,
        [post.id, currentUser.id]
      );
  
      if (vote) {
        await pool.query(
          `UPDATE votes SET vote = ?
          WHERE id = ?`,
          [voteCurrent, vote.id]
        )
  
      } else {
        await pool.query(
          `INSERT INTO votes(postId, userId, vote) VALUES(?,?,?)`,
          [post.id, currentUser.id, voteCurrent]
        )
      }

      const {voteCount, voteCountDown, voteCountUp} = await getVotes(post);
      const {postVote} = await getVote(post,currentUser)

 

    return { 
        message: `El voto fue ${vote ? "modificado" : "agregado"} exitosamente.`,
        voteCount,
        voteCountDown,
        voteCountUp,
        postVote
     }

  } catch (error) {
    throw error

  }
}