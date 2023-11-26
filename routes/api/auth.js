import { Router } from 'express';
import {
  getCurrent,
  login,
  logout,
  register,
  resendVerifyEmail,
  updateAvatar,
  updateSubscription,
  verifyEmail,
} from '../../controllers/auth.js';
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

router.post('/register', authValidator(registerSchema), ctrlWrapper(register));
router.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));
router.post(
  '/verify',
  authValidator(emailSchema),
  ctrlWrapper(resendVerifyEmail),
);

router.post('/login', authValidator(loginSchema), ctrlWrapper(login));

router.get('/current', authenticate, ctrlWrapper(getCurrent));

router.post('/logout', authenticate, logout);

router.patch(
  '/avatars',
  authenticate,
  authValidator(updateAvatarSchema),
  upload.single('avatar'),
  ctrlWrapper(updateAvatar),
);

router.patch(
  '/',
  authenticate,
  authValidator(subscriprionSchema),
  ctrlWrapper(updateSubscription),
);

export default router;
