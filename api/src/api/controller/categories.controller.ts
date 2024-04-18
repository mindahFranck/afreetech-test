import { Request, Response } from "express";
import { createCategories, updatedCategories, deleteCategoriesid, getallCategories, getCategoriesbyId } from "../service/categories.service";


export async function AddCategories(
  req: Request,
  res: Response
) {
  try {
    const data = await createCategories(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
};


export async function updateCategories(
  req: Request,
  res: Response
) {

  updatedCategories(req.params.id, req.body)
    .then(function (Categories) {
      return res.status(201).json(Categories)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour le Centre d'interets",err })
    })


}
export async function deleteCategories(
  req: Request,
  res: Response
) {
    deleteCategoriesid(parseInt(req.params.id))

    .then(function (delCategories) {
      return res.status(201).json(delCategories)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer le Centre d'interets" })
    })

}
export async function getAllCategories(
  req: Request,
  res: Response
) {
  getallCategories()
    .then(function (allCategories) {
      return res.status(201).json(allCategories)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Centre d'interets", err })
    })
}
export async function getCategoriesById(
  req: Request,
  res: Response
) {

  getCategoriesbyId(parseInt(req.params.id))
    .then(function (Categories) {
      return res.status(201).json(Categories)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Centre d'interets" })
    })


}





