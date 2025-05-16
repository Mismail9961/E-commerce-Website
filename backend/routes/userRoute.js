import express from 'express';
import { loginUser, registerUser, admin } from '../controllers/userController.js'; // Add .js

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/admin', admin);

export default userRouter;