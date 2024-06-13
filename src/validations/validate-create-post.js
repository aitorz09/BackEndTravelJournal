export default function validateCreatePost({ title, description }) {
  if ([title, description].includes("") || [title, description].includes(undefined)) {
    /*      let error = new Error("Todos los campos son requeridos");
         error.status = 400;
         throw error; */
    throw {
      message: "Todos los campos son requeridos",
      status: 400,
      code: "BAD REQUEST"
    }
  };

  return {
    title,
    description
  }
}