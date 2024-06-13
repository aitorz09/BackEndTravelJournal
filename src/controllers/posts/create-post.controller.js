import { createPostModel } from "../../models/posts/index.js";
import validateCreatePost from "../../validations/validate-create-post.js";

export default async function listPostController(req, res, next) {
    try {

        const currentUser = req.currentUser;

        // Validar los datos
        const { title, description} = validateCreatePost(req.body);
        
        // Verificar los tags
        const tags = [...req.body.tags] 

        const { post } = await createPostModel(currentUser, title, description, tags)

        return res.status(200).json({
            ok: true,
            id: post.insertId
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}