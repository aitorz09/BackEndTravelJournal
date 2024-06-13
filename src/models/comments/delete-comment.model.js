import getPool from "../../database/get-pool.js";

export default async function deleteComment(comment) {

const pool = await getPool()
    try {
       
        await pool.query(`
        DELETE FROM comments
        WHERE id = ?`,
        [comment.id]);
    
        return {
            message: "Comentario eliminado con éxito",
        }
    
      } catch (error) {
        throw error
      }
   
}