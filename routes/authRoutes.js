import express from 'express';
const router = express.Router();
import {register, loginUser, updateUser} from '../controllers/authController.js'


router.route('/register').post(register);
router.route('/login').post(loginUser);
router.route('/updateUser').patch(updateUser);

export default router;