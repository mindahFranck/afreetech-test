import CategoriesModel from "../models/categories.models";
import CentreInteretModel, { CentreInteretAttributes } from "../models/centreInteret.models";


export async function createCentreInteret(value: CentreInteretAttributes) {

    const newCentreInteret = CentreInteretModel.create(
        value
    );
    return newCentreInteret


}

export async function findCentreInteret(value: any) {
    const val = await CentreInteretModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallCentreInteret() {

    const CentreInteret = await CentreInteretModel.findAll({
        include: {
            model: CategoriesModel
        }
    });
    return CentreInteret;


}

export async function deleteCentreInteretid(id: number) {

    await CentreInteretModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getCentreInteretbyId(id: number) {

    const CentreInteret = await CentreInteretModel.findByPk(id
        
);
    return CentreInteret;


}
export async function updatedCentreInteret(id: string, value: CentreInteretAttributes) {
    const data = await CentreInteretModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}

