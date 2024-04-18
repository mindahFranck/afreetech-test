import { Express } from "express";
import { getAllCategories, getCategoriesById, updateCategories, AddCategories, deleteCategories } from "../controller/categories.controller";

function categories(app: Express) {

    /**
     * @swagger
     * '/api/categories':
     *  get:
     *     tags:
     *      - categories
     *     descriptions: Get all categories
     *     responses:
     *         200:
     *             description: all categories
     */
    app.get('/api/categories', getAllCategories)



    /**
    * @swagger
    * '/api/categories/{id}':
    *  get:
    *     tags:
    *      - categories
    *     descriptions: Get categories by Id
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: ID Obligatoire
    *         schema:
    *          type: integer
    *     responses:
    *         200:
    *             description: Get categories by Id
    */
    app.get('/api/categories/:id', getCategoriesById)


     /**
   * @swagger
   * '/api/categories/{id}':
   *  put:
   *     tags:
   *     - categories
   *     summary: Update  categories
   *     description: Update categories
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
   *              $ref: '#/components/schemas/CreateCategoriesInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateCategoriesResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.put('/api/categories/:id', updateCategories)
     /**
   * @swagger
   * '/api/categories':
   *  post:
   *     tags:
   *     - categories
   *     summary: Register a categories
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateCategoriesInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateCategoriesResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
    app.post('/api/categories', AddCategories)
 /**
  * @swagger
  * '/api/categories/{id}':
  *  delete:
  *     tags:
  *      - categories
  *     descriptions: Delete categories
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         description: ID Obligatoire
  *         schema:
  *         type: integer
  *     responses:
  *         200:
  *             description: Delete categories
  */
    app.delete('/api/categories/:id', deleteCategories)

}
export default categories;