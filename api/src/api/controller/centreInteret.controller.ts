import { Request, Response } from "express";
import { createCentreInteret, updatedCentreInteret, deleteCentreInteretid, getallCentreInteret, getCentreInteretbyId } from "../service/centreInteret.service";


export async function AddCentreInteret(
  req: Request,
  res: Response
) {
  try {
    const data = await createCentreInteret(req.body);
    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(409).send(e.message);
  }
};


export async function updateCentreInteret(
  req: Request,
  res: Response
) {

  updatedCentreInteret(req.params.id, req.body)
    .then(function (CentreInteret) {
      return res.status(201).json(CentreInteret)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de mettre a jour le Centre d'interets",err })
    })


}
export async function deleteCentreInteret(
  req: Request,
  res: Response
) {
    deleteCentreInteretid(parseInt(req.params.id))

    .then(function (delCentreInteret) {
      return res.status(201).json(delCentreInteret)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de supprimer le Centre d'interets" })
    })

}
export async function getAllCentreInteret(
  req: Request,
  res: Response
) {
  getallCentreInteret()
    .then(function (allCentreInteret) {
      return res.status(201).json(allCentreInteret)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Centre d'interets", err })
    })
}
export async function getCentreInteretById(
  req: Request,
  res: Response
) {

  getCentreInteretbyId(parseInt(req.params.id))
    .then(function (CentreInteret) {
      return res.status(201).json(CentreInteret)
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': "impossible de retouner la liste des Centre d'interets" })
    })


}





