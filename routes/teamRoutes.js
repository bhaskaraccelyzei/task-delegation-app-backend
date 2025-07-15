const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createTeam, getMyTeams } = require('../controllers/teamController');

/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team management routes
 */

/**
 * @swagger
 * /api/teams/create:
 *   post:
 *     summary: Create a new team
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - members
 *             properties:
 *               name:
 *                 type: string
 *               members:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: User IDs
 *     responses:
 *       201:
 *         description: Team created successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/create', authMiddleware, createTeam);

/**
 * @swagger
 * /api/teams/my:
 *   get:
 *     summary: Get all teams the user is a member of
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       members:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                             email:
 *                               type: string
 */


router.get('/my', authMiddleware, getMyTeams);
module.exports = router;
