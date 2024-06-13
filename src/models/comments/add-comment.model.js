import getPool from "../../database/get-pool.js";

export default async function addComment(message, post, currentUser) {

const pool = await getPool()
    try {
       
        const [newComment] = await pool.query(`
        INSERT 
        INTO comments(message, postId, userId)
        VALUES(?,?,?)`,
        [message, post.id, currentUser.id]);

        const [[comment]] = await pool.query(`
        SELECT comments.id, message, comments.createdAt, userId, username, avatar
          FROM comments
          INNER JOIN users
          ON users.id = comments.userId
          WHERE comments.id = ?`,
        [newComment.insertId]) 
    
        return {
            comment
        }
    
      } catch (error) {
        throw error
      }
   
}