import { signInModel } from "../../models/auth/index.js";

export default async function signInController(req,res,next) {
    try {
        const { email, password } = req.body;
    
        // validar los datos
        if ([email, password].includes("" || undefined)) {
          let error = new Error("Todos los campos son requeridos");
          error.status = 400;
          throw error;
        }
        
        const {token} = await signInModel(email, password)
    
        return res.status(200).json({
          ok: true,
          token,
        });
      } catch (error) {
        console.log(error);
        next(error);
      }
}