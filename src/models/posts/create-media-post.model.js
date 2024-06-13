import getPool from "../../database/get-pool.js";

export default async function createMediaPostModel(post, mimeType, url) {

const pool = await getPool()
    try {
       
        //guardamos los cambios en la base de datos
        await pool.query(
          `INSERT INTO post_media(url, mimeType, postId) VALUES(?,?,?)`,
          [url, mimeType, post.id]
        )
    
        return {
          url
        }
    
      } catch (error) {
        throw error
      }
   
}