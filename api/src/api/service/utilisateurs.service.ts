const { Sequelize } = require('sequelize');
import { loginInterface, UserInterface } from "../interface/user.interface";
import UtilisateursModel from "../models/utilisateurs.model";

export async function createuser(value:any) {
        var newUser = UtilisateursModel.create(
          value
        );
  
      return newUser
      
  
}
export async function loginuser(value:loginInterface) {
    const finduser= UtilisateursModel.findOne({
    where: {username: value.username},

})
    return finduser;
} 
export async function finduse(value:any) {
 const val = await UtilisateursModel.findOne({
        where: { username: value}
      })
      return val
}
export async function getallusers() {

        const user = await UtilisateursModel.findAll({
            attributes: ["id","username","nom","prenoms","phone"]
        }); 
        return user;

     
}
export async function deleteUserid(id:number) {
  
        const user = await UtilisateursModel.destroy({
            where:{
                id:id
            }
        });
        return id;

}
export async function getbyId(id:number) {
 
        const user = await UtilisateursModel.findByPk(id);
        return user;

   
}
export async function updated(id:number, value:UserInterface) {
   const data = await UtilisateursModel.update(value,{
        where:{
            id: id
        }
    });
    return data;
}