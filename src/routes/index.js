const Router = require("express") ;
const authRoute = require('../Modules/auth/authRoute')
const tenantRoute = require('../Modules/tenant/tenantRoute')

const router = Router();

// initialize modules routes 
router.use('/auth',authRoute);
router.use('/tenant',tenantRoute)

module.exports = router;
