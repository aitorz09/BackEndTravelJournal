import getPool from "../../database/get-pool.js";


export const getVotes = async (post) => {

    const pool = await getPool();
    
    //obtener la cantidad de votos y guardar el resultado en 'voteCount'
    const [[{ voteCount }]] = await pool.query(
        `SELECT SUM(vote) AS voteCount FROM votes WHERE postId = ?`,
        [post.id]
      );
      //obtener la cantidad de votos y guardar el resultado en 'voteCount'
      const [[{ voteCountUp }]] = await pool.query(`
      SELECT COUNT(vote) AS voteCountUp 
      FROM votes WHERE vote > 0 
      AND postId = ?`,
        [post.id]
      );
      //obtener la cantidad de votos y guardar el resultado en 'voteCount'
      const [[{ voteCountDown }]] = await pool.query(`
      SELECT COUNT(vote) AS voteCountDown 
      FROM votes WHERE vote < 0 
      AND postId = ?`,
        [post.id]
      );

      return {
        voteCount,
        voteCountDown,
        voteCountUp
      }
}