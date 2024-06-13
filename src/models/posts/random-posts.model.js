import getPool from "../../database/get-pool.js";

export default async function randomPostsModel(limit = 4) {
    try {

        const pool = await getPool();

        const [posts] = await pool.query(`
        SELECT * FROM posts ORDER BY RAND() LIMIT ?`,
            [+limit]
        )

        const postsPromises = posts.map(async (post) => {
            //obtener la media del post y guardar el resultado en 'media'
            const [[media]] = await pool.query(
                `SELECT id, url, mimeType  FROM post_media WHERE postId = ?`,
                [post.id]
            );
            //obtener los datos del usuario y guardar el resultado en 'user'
            const [[user]] = await pool.query(
                `SELECT id, username, avatar FROM users WHERE id = ?`,
                [post.userId]
            );

            return {
                ...post,
                media,
                user
            }
        });

        const postsWithMedia = await Promise.all(postsPromises)

        return {
            posts: postsWithMedia,
        };

    } catch (error) {
        throw error
    }
}