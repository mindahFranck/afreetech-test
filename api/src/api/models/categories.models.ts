import {  Model, DataTypes } from "sequelize";
import { sequelize } from "../utils/database/sequelize";

export interface CategoriesAttributes {
  id: number;
  libelle: string;

}

class CategoriesModel extends Model<CategoriesAttributes> implements CategoriesAttributes {
  public id!: number;
  public libelle!: string;
}

CategoriesModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    libelle: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "dev_Categories",
    freezeTableName: true,
    timestamps: true,
    
  }
);

(async () => {
    await sequelize.sync({ force: false });
})();


export default CategoriesModel;
