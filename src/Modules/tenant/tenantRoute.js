const { Router } = require('express');
const authenticate = require('../../middlewares/authMiddleware');
const { hasPermission } = require('../../middlewares/permissionMiddleware');

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Tenants
 *     description: Endpoints related to tenant management
 *
 * /tenant/list:
 *   get:
 *     summary: Tenant List
 *     description: Returns a list of tenants
 *     tags: [Tenants]
 *     security:
 *       - BearerAuth: []  # Specifies that Authorization is required
 *     responses:
 *       200:
 *         description: Successful response with the tenant list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 获取列表成功
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */




router.get('/list', authenticate,hasPermission('tenant.view'), (req, res) => {
    res.json({
        status: 200,
        message: '获取列表成功',
    })
})

module.exports = router;