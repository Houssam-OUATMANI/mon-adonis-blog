import User from '#models/user'
import { loginUserValidator, registerUserValidator } from '#validators/auth'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { writeFile } from 'fs/promises'
import { toPng } from 'jdenticon'


export default class AuthController {
    
   
   
    register({view} : HttpContext) {
        return view.render('pages/auth/register')
    }

    async handleRegister ({request, session, response} : HttpContext ) {
        const {email, password, thumbnail ,username} = await request.validateUsing(registerUserValidator)
       
        if(!thumbnail) {
            const png = toPng(username, 100)
            await writeFile(`public/users/${username}.png`, png)
        }

        else {
            await thumbnail.move(app.makePath("public/users"), {name : `${cuid()}.${thumbnail.extname}`})
        }

        const filePath = `users/${thumbnail?.fileName || username + ".png"}`
    
        await User.create({email, username, thumbnail: filePath, password})
        session.flash("success", "Inscription Ok!!")
        return response.redirect().toRoute("auth.login")
    }


    login({view} : HttpContext) {
        return view.render('pages/auth/login')
    }

    async handleLogin({request, auth, session, response} : HttpContext ) {
           const {email, password} =  await request.validateUsing(loginUserValidator)
         const user =  await User.verifyCredentials(email, password)
          await auth.use("web").login(user)
          session.flash("success", "Connexion Ok!!")
          return response.redirect().toRoute("home")
    }

    async logout ({auth, session, response} : HttpContext) {
        await auth.use("web").logout()
        session.flash("success", "Déconnexion Ok!!")
        return response.redirect().toRoute("auth.login")

    }

}