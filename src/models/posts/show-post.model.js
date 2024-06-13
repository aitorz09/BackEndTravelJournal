import getPool from "../../database/get-pool.js";
import { getDetails } from "./getDetails.js";

export default async function showPostModel(idPost, currentUser) {
    try {
        
        const pool = await getPool();

        const [[post]] = await pool.query(`
        SELECT * FROM posts WHERE id = ?`,
        [idPost]
        )

        const postsWithDetail = await getDetails([post], currentUser)
        
        const [comments] = await pool.query(`
        SELECT comments.id, message, comments.createdAt, userId, username, avatar
        FROM comments 
        INNER JOIN users
        ON users.id = comments.userId
        WHERE comments.postId = ?
        ORDER BY createdAt DESC
        `,
          [idPost]
        );
    
        //obtener la media del post y guardar el resultado en 'media'
        const [media] = await pool.query(
          `SELECT id, url, mimeType  FROM post_media WHERE postId = ?`,
          [idPost]
        );
        
        return {
          post : {
            ...postsWithDetail[0],
            comments,
            media
          }
        };
    
      } catch (error) {
        throw error
      }
}