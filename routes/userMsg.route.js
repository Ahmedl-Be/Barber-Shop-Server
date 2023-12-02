import express from 'express';
import {sendMsg,getAllMsg} from '../controllers/UsersMsgController.js';
import {vaildationSchema} from '../middlewares/msgValidationSchema.js';
import authorizeOwner from '../middlewares/authorizeOwner .js';
const router = express.Router()

router.route("/")
.post(vaildationSchema(),sendMsg)
.get(authorizeOwner,getAllMsg)

export default router;