export default function verifyOwner(entity, currentUser) {
    if(entity.userId != currentUser.id){
        throw {
          status : 403,
          message : "No estás acreditado",
          code : "UNAUTHORIZED"
        }
      };
}