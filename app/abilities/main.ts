/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Post from '#models/post'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

/**
 * Delete the following ability to start from
 * scratch
 */
export const alterPost = Bouncer.ability((user: User, post: Post) => {
    return user.id === post.userId
})