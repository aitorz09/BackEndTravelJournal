import getPool from "../../database/get-pool.js";

export default async function updateComment(message, comment) {

const pool = await getPool()
    try {
       
        const [response] = await pool.query(`
          UPDATE comments 
          SET message = ? 
          WHERE id = ?`,
        [message, comment.id]);
    
        return {
            //message: response.changedRows ? "Comentario actualizado con éxito" : "No hubo cambios",
            message: "Comentario actualizado con éxito"
        }
    
      } catch (error) {
        throw error
      }
   
}