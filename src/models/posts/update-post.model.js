import getPool from "../../database/get-pool.js";

export default async function updatePostModel(post, title, description, tags) {

const pool = await getPool()
    try {
       
        const [response] = await pool.query(`
        UPDATE posts SET title = ?, description = ?
        WHERE id = ?`,
          [title, description, post.id]);

        //elimino todas las tags asociadas a la publicación
          await pool.query(`
          DELETE FROM posts_tags
          WHERE postId = ?`, [post.id]
          )
        //inserto las nuevas tagas
        const promisesTags = tags.map(async (tag) => {
            await pool.query(`
            INSERT INTO posts_tags(postId, tagId) 
                VALUES(?,?)`, [post.id, tag]
            )
        });

        await Promise.all(promisesTags);
    
        return {
          //message: response.changedRows ? "Publicación actualizada con éxito" : "No hubo cambios",
          message: "Publicación actualizada con éxito",

        }
    
      } catch (error) {
        throw error
      }
   
}