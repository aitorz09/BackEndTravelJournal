export default function validateCreateComment({message}) {
    if ([message].includes("" || undefined)) {
        throw {
            message: "Todos los campos son requeridos",
            status : 400,
            code : "BAD REQUEST"
        }
      };

      return {
        message
      }
}