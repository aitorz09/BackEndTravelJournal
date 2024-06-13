import getPool from "../../database/get-pool.js";
import { getDetails } from "./getDetails.js";

export default async function listPostsByTagModel(currentUser, tag = 1,limit = 10, offset = 0) {
  try {

    const pool = await getPool();
 
    const [posts] = await pool.query(`
      SELECT posts.id, title, description, userId, posts.createdAt FROM posts 
      INNER JOIN posts_tags ON posts.id = posts_tags.postId 
      WHERE posts_tags.tagId = ?
      ORDER BY posts.createdAt DESC 
      LIMIT ? OFFSET ? `, 
      [+tag,+limit, +offset]);
    const [[{ total }]] = await pool.query(`
      SELECT COUNT(*) AS total 
      FROM posts
      INNER JOIN posts_tags ON posts.id = posts_tags.postId 
      WHERE posts_tags.tagId = ?`,
      [+tag]); 

    const postPromises = await getDetails(posts, currentUser)
    const postsWithDetail = await Promise.all(postPromises)

    return { postsWithDetail, total }

  } catch (error) {
    throw error

  }
}