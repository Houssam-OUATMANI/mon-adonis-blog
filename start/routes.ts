/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import SocialController from '#controllers/social_controller'
import ResetPasswordController from '#controllers/reset_password_controller'
import PostController from '#controllers/post_controller'

router.get('/', [PostController, 'index']).as('home')




router
    .get('/register', [AuthController, 'register'])
    .as("auth.register")
    .use(middleware.guest())

router
    .post('/register', [AuthController, 'handleRegister'])
    .use(middleware.guest())

router
    .get('/login', [AuthController, 'login']).as("auth.login")
    .use(middleware.guest())

router
    .post('/login', [AuthController, 'handleLogin'])
    .use(middleware.guest())


router
    .get('/forgot-password', [ResetPasswordController, 'forgotPassword'])
    .as("auth.forgot-password")
    .use(middleware.guest())

router
    .post('/forgot-password', [ResetPasswordController, 'handleForgotPassword'])
    .use(middleware.guest())

router
    .get('/reset-password', [ResetPasswordController, 'resetPassword'])
    .as("auth.reset-password")
    .use(middleware.guest())

router
    .post('/reset-password', [ResetPasswordController, 'handleResetPassword'])
    .as("auth.handleReset-password")
    .use(middleware.guest())

router
    .get('/github/redirect', [SocialController, 'githubRedirect'])
    .use(middleware.guest())
    .as("github.redirect")

router
    .get('/github/callback', [SocialController, 'githubCallback'])
    .use(middleware.guest())
    .as("github.callback")

router
    .delete('/logout', [AuthController, 'logout'])
    .as("auth.logout")
    .use(middleware.auth())


router
    .get('/posts/create', [PostController, 'create'])
    .as('post.create')
    .use(middleware.auth())


router
    .post('/posts/create', [PostController, 'store'])
    .use(middleware.auth())





