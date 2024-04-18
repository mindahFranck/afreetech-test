import {  Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";
import CategoriesModel from "./categories.models";

export interface CentreInteretAttributes {
  id: number;
  noms: string;
  longitude: number;
  latitude: number;

}

class CentreInteretModel extends Model<CentreInteretAttributes> implements CentreInteretAttributes {
  public id!: number;
  public noms!: string;
  public longitude!: number;
  public latitude!: number;

  // Add other attributes if needed
}

CentreInteretModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    noms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },   
     latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    
  },
  {
    sequelize,
    tableName: "dev_centreInteret",
    freezeTableName: true,
    timestamps: true,
    
  }
);

(async () => {
    await sequelize.sync({ force: false });
})();


CentreInteretModel.belongsTo(CategoriesModel);
CategoriesModel.hasMany(CentreInteretModel)

export default CentreInteretModel;
