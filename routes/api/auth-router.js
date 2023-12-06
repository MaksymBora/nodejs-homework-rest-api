import { Router } from 'express';
import authConroller from '../../controllers/auth-controller.js';
import { bodyValidator } from '../../decorators/bodyValidatorWrapper.js';
import usersSchemas from '../../schemas/user-schemas.js';
import authenticate from '../../middlewares/authenticate.js';
import { upload } from '../../middlewares/upload.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      example: 'OrderedMap { "name": "John", "email": "john@example.com", "password": "exampleqwe12345" }'   # Example of a parameter value
 *      required:
 *        - email
 *        - password
 *        - name
 *      properties:
 *        _id:
 *          type: string
 *          description: Backend-generated unique identifier
 *        email:
 *          type: string
 *          description: E-mail address.
 *        name:
 *          type: string
 *          description: Username
 *        password:
 *          type: string
 *          description: Password
 *        avatar:
 *          type: string
 *          description: Default user avatar, but you can change it
 *
 *
 *
 */

// Signup
router.post(
  '/register',
  bodyValidator(usersSchemas.registerSchema),
  authConroller.signup,
);

// Verify Email
router.get('/verify/:verificationToken', authConroller.verify);

// Resend Verification Email
router.post(
  '/verify',
  bodyValidator(usersSchemas.emailSchema),
  authConroller.resendVerifyEmail,
);

// Login
router.post(
  '/login',
  bodyValidator(usersSchemas.loginSchema),
  authConroller.signin,
);

// Check current user if token is available
router.get('/current', authenticate, authConroller.getCurrent);

// Logout
router.post('/logout', authenticate, authConroller.signout);

// Update Avatar
router.patch(
  '/avatars',
  authenticate,
  bodyValidator(usersSchemas.updateAvatarSchema),
  upload.single('avatar'),
  authConroller.updateAvatar,
);

// Update type of Subscription
router.patch(
  '/',
  authenticate,
  bodyValidator(usersSchemas.subscriprionSchema),
  authConroller.updateSubscription,
);

export default router;
