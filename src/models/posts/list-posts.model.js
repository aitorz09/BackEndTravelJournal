import getPool from "../../database/get-pool.js";
import { getDetails } from "./getDetails.js";

export default async function listPostsModel(currentUser, limit = 10, offset = 0) {
  try {

    const pool = await getPool();

    const [posts] = await pool.query(`SELECT * FROM posts ORDER BY createdAt DESC LIMIT ? OFFSET ?`, [+limit, +offset]);
 
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM posts`); 

    const postsWithDetail = await getDetails(posts, currentUser)

    return { postsWithDetail, total }

  } catch (error) {
    throw error

  }
}