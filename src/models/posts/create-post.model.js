import getPool from "../../database/get-pool.js";

export default async function createPostModel(currentUser, title, description, tags) {
    try {
        const pool = await getPool();

        const [post] = await pool.query(`
        INSERT INTO posts(title, description, userId) 
            VALUES(?,?,?)`, [title, description, currentUser.id]
        )

        const promisesTags = tags.map(async (tag) => {
            await pool.query(`
            INSERT INTO posts_tags(postId, tagId) 
                VALUES(?,?)`, [post.insertId, tag]
            )
        });

        await Promise.all(promisesTags)
        
        return {
            post,
        };

    } catch (error) {
        throw error
    }
}