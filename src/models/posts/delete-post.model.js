import getPool from "../../database/get-pool.js";

export default async function deletePostModel(post) {

const pool = await getPool()
    try {

        //elimino todas las tags asociadas a la publicación
        await pool.query(`
        DELETE FROM posts_tags
        WHERE postId = ?`, [post.id]
        )

        //elimino todas los media asociadas a la publicación
        await pool.query(`
        DELETE FROM post_media
        WHERE postId = ?`, [post.id]
        )
        //todo: eliminar las imágenes y videos almancenados en el servidor

        //elimino la publiación
        const response = await pool.query(`
        DELETE FROM posts
        WHERE id = ?`,
        [post.id]);
    
        return {
          //message: response.changedRows ? "Publicación actualizada con éxito" : "No hubo cambios",
          message: "Publicación eliminada con éxito",

        }
    
      } catch (error) {
        throw error
      }
   
}