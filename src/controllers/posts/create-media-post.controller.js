import {createMediaPostModel} from "../../models/posts/index.js";
import verifyOwner from "../../validations/verify-owner.js";
import verifyPost from "../../validations/verify-post.js";
import path from 'path';

export default async function createMediaPostController(req, res, next) {

  const PUBLIC_FOLDER = path.join(process.cwd(), "public")

    try {

      //verificar el post
    const post = await verifyPost(req.params.idPost)

    // verificar el dueño
    const currentUser = req.currentUser;
    verifyOwner(post, currentUser)

    //validar la carga del archivo
    if (!req.files) {
      throw {
        status: 400,
        message: "No se subió ningún archivo!",
        code: "BAD REQUEST"
      }
    }

    //recibir la imagen o el video
    const myFile = req.files.media;

            //extraer la extensión del archivo que se subió
            const fileExt = path.extname(myFile.name);
    
            //extraer el mimeType
            const mimeType = myFile.mimetype
        
            //generar un nombre aleatorio
            const fileName = crypto.randomUUID();
        
            //generar la url que se guardará en la respectiva tabla (post_media)
            const filePath = path.join('media', fileName + fileExt);
            const url = `${req.protocol}://${req.get('host')}/${filePath}`;

    //validar si es una imagen o un video
    if (!myFile.mimetype.startsWith("image") && !myFile.mimetype.startsWith("video")) {
      throw {
        status: 400,
        message: "El archivo no es una imagen ni un video",
        code: "BAD REQUEST"
      }
    }

    // guardar la información en la base de datos
       await createMediaPostModel(post, mimeType, url)

        //mover el archivo de la memoria al disco
        await myFile.mv(path.join(PUBLIC_FOLDER, filePath))

        return res.status(200).json({
            ok: true,
            url
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}