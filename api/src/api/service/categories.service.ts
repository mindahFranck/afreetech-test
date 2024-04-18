import CategoriesModel, { CategoriesAttributes } from "../models/categories.models";


export async function createCategories(value: CategoriesAttributes) {

    const newCategories = CategoriesModel.create(
        value
    );
    return newCategories


}

export async function findCategories(value: number) {
    const val = await CategoriesModel.findOne({
        where: { id: value }
    })
    return val
}



export async function getallCategories() {

    const Categories = await CategoriesModel.findAll();
    return Categories;


}

export async function deleteCategoriesid(id: number) {

    await CategoriesModel.destroy({
        where: {
            id: id
        }
    });
    return id;

}
export async function getCategoriesbyId(id: number) {

    const Categories = await CategoriesModel.findByPk(id);
    return Categories;


}
export async function updatedCategories(id: string, value: CategoriesAttributes) {
    const data = await CategoriesModel.update(value, {
        where: {
            id: id
        }
    });
    return data;
}

