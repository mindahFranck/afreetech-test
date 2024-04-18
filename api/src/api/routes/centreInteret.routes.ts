import { Express } from "express";
import { getAllCentreInteret, getCentreInteretById, updateCentreInteret, AddCentreInteret, deleteCentreInteret } from "../controller/centreInteret.controller";

function centreinteret(app: Express) {

    /**
     * @swagger
     * '/api/centreinteret':
     *  get:
     *     tags:
     *      - centreinteret
     *     descriptions: Get all centreinteret
     *     responses:
     *         200:
     *             description: all centreinteret
     */
    app.get('/api/centreinteret', getAllCentreInteret)



    /**
    * @swagger
    * '/api/centreinteret/{id}':
    *  get:
    *     tags:
    *      - centreinteret
    *     descriptions: Get centreinteret by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: integer
    *     responses:
    *         200:
    *             description: Get centreinteret by Id
    */
    app.get('/api/centreinteret/:id', getCentreInteretById)


     /**
   * @swagger
   * '/api/centreinteret/{id}':
   *  put:
   *     tags:
   *     - centreinteret
   *     summary: Update  centreinteret
   *     description: Update centreinteret
   *     parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            description: ID Obligatoire
   *            schema:
   *             type: integer
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateCentreInteretInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateCentreInteretResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.put('/api/centreinteret/:id', updateCentreInteret)
     /**
   * @swagger
   * '/api/centreinteret':
   *  post:
   *     tags:
   *     - centreinteret
   *     summary: Register a centreinteret
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateCentreInteretInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateCentreInteretResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.post('/api/centreinteret', AddCentreInteret)
 /**
  * @swagger
  * '/api/centreinteret/{id}':
  *  delete:
  *     tags:
  *      - centreinteret
  *     descriptions: Delete centre interet
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID Obligatoire
  *         schema:
  *         type: integer
  *     responses:
  *         200:
  *             description: Delete centre interet
  */
    app.delete('/api/centreinteret/:id', deleteCentreInteret)

}
export default centreinteret;