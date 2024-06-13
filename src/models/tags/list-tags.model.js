import getPool from "../../database/get-pool.js";

export default async function listTagsModel() {
  try {

    const pool = await getPool();

    const [tags] = await pool.query(`
    SELECT id, name FROM tags 
    ORDER BY name`);
 

    return { tags }

  } catch (error) {
    throw error

  }
}