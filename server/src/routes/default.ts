import { Request, Response, Router } from "express";

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       created:
 *                         type: string
 *                         format: date-time
 */
router.get('/user', (req:Request, res: Response) => {
    res.json({
        success: true,
        message: 'Hello World',
        data:[]
    });
});

export default router;