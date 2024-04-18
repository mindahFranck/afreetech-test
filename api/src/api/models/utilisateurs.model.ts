import { Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";

interface UtilisateursAttributes {
  id: number;
  username: string;
  password: string;
  nom: string;
  prenoms: string;
  phone: string;
}

class UtilisateursModel
  extends Model<UtilisateursAttributes>
  implements UtilisateursAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public nom!:string;
  public prenoms!:string;
  public phone!:string;
} 

UtilisateursModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    prenoms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "dev_utilisateurs",
    tableName: "dev_utilisateurs",
    freezeTableName: true,
    timestamps: true,
  }
);


(async () => {
  await sequelize.sync({ force: false });
})();


export default UtilisateursModel;
