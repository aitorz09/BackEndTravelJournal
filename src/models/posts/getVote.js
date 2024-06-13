import getPool from "../../database/get-pool.js";

export const getVote= async  (post,currentUser) => {

    const pool = await getPool();

    let postVote = null
    if (currentUser) {
      const [[result]] = await pool.query(
        `SELECT *  FROM votes WHERE postId = ? AND userId = ?`,
        [post.id, currentUser.id]
      );
      postVote = result&& result.vote
    }

    return {
        postVote
    }
}