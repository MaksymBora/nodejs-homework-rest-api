import { Router } from 'express';
import { login, register } from '../../controllers/auth.js';
import { authValidator } from '../../helpers/bodyValidatorWrapper.js';
import { loginSchema, registerSchema } from '../../models/user.js';

const router = Router();

router.post('/register', authValidator(registerSchema), register);
router.post('/login', authValidator(loginSchema), login);

export default router;
