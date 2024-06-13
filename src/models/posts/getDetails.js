import getPool from "../../database/get-pool.js";
import { getVote } from "./getVote.js";
import { getVotes } from "./getVotes.js";


export const getDetails = async (posts, currentUser) => {

    const pool = await getPool();
    
    const postPromises = posts.map(async (post) => { //!DEVUELVE UN ARRAY DE PROMESAS
    //obtener la cantidad de comentarios y guardar el resultado en 'commentCount'
    const [[{ commentCount }]] = await pool.query(`
      SELECT COUNT(*) AS commentCount 
      FROM comments 
      WHERE postId = ?
      `,
      [post.id]
    );
    
    const {voteCount, voteCountDown, voteCountUp} = await getVotes(post)

    //obtener los datos del usuario y guardar el resultado en 'user'
    const [[user]] = await pool.query(
      `SELECT id, username, avatar FROM users WHERE id = ?`,
      [post.userId]
    );
    //obtener la media del post y guardar el resultado en 'media'
    const [[media]] = await pool.query(
      `SELECT id, url, mimeType  FROM post_media WHERE postId = ?`,
      [post.id]
    );
    //obtener el voto otorgado al post por el usuario actual
    const {postVote} = await getVote(post,currentUser)

    //obtener los tags del post
    const [tags] = await pool.query(
      `SELECT tags.id, tags.name FROM tags 
          INNER JOIN posts_tags ON tags.id = posts_tags.tagId
          WHERE postId = ?`,
      [post.id]
    )

    return {
      ...post,
      commentCount,
      voteCount: +voteCount,
      voteCountUp: +voteCountUp,
      voteCountDown: +voteCountDown,
      user,
      media,
      postVote,
      tags
    }

  })
  const postsWithDetail = await Promise.all(postPromises)

  return postsWithDetail
}