import { Router } from 'express';
import authConroller from '../../controllers/auth-controller.js';
import { authValidator } from '../../middlewares/bodyValidatorWrapper.js';
import {
  emailSchema,
  loginSchema,
  registerSchema,
  subscriprionSchema,
  updateAvatarSchema,
} from '../../models/user.js';
import authenticate from '../../middlewares/authenticate.js';
import { ctrlWrapper } from '../../helpers/ctrlWrapper.js';
import { upload } from '../../middlewares/upload.js';

const router = Router();

// Signup
router.post('/register', authValidator(registerSchema), authConroller.signup);

// Verify Email
router.get('/verify/:verificationToken', authConroller.verify);

// Resend Verification Email
router.post(
  '/verify',
  authValidator(emailSchema),
  authConroller.resendVerifyEmail,
);

// Login
router.post('/login', authValidator(loginSchema), authConroller.signin);

// Check current user if token is available
router.get('/current', authenticate, authConroller.getCurrent);

// Logout
router.post('/logout', authenticate, authConroller.signout);

router.patch(
  '/avatars',
  authenticate,
  authValidator(updateAvatarSchema),
  upload.single('avatar'),
  authConroller.updateAvatar,
);

router.patch(
  '/',
  authenticate,
  authValidator(subscriprionSchema),
  authConroller.updateSubscription,
);

export default router;
