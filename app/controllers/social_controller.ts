 import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocialController {

        githubRedirect({ally} : HttpContext ) {
            ally.use('github').redirect((req) => {
                req.scopes(['user'])
            })
        }


        async githubCallback({ally, response, session, auth} : HttpContext ) {
            const gh = ally.use('github')

            /**
             * User has denied access by canceling
             * the login flow
             */
            if (gh.accessDenied()) {
              session.flash("success", "Tu as annuler l'autorisation d'access")
              return response.redirect().toRoute('auth.login')
            }
          
            /**
             * OAuth state verification failed. This happens when the
             * CSRF cookie gets expired.
             */
            if (gh.stateMisMatch()) {
                session.flash("success", "Erreur  d'access")
                return response.redirect().toRoute('auth.login')
            }
          
            /**
             * GitHub responded with some error
             */
            if (gh.hasError()) {
                session.flash("success", "Erreur  d'access")
                return response.redirect().toRoute('auth.login')
            }
          
            /**
             * Access user info
             */
            const githubUser = await gh.user()
            const user =  await User.findBy("email", githubUser.email)
            if(!user) {
               const newUser= await User.create({username : githubUser.name, email : githubUser.email, thumbnail : githubUser.avatarUrl})
               await auth.use('web').login(newUser)
            }
            else {
                await auth.use('web').login(user)
            }
            session.flash("success", "Connecter avec github")
            return response.redirect().toRoute('home')

          
        }

}