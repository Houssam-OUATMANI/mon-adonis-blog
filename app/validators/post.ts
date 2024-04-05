import vine from '@vinejs/vine'


export const storePostValidator = vine.compile(
    vine.object({
      title : vine.string().unique(async (db, value) => {
        const post = await db.from('posts').where('title', value).first()
        return !post
      }),
      thumbnail: vine.file({extnames : ["jpg", "png"], size : "10mb"}).optional(),
      content: vine.string(),
    })
  )

  export const updatePostValidator = vine.compile(
    vine.object({
      title : vine.string().unique(async (db, value, field) => {
        const post = await db
                              .from('posts')
                              .whereNot('id', field.data.params.id)
                              .where('title', value).first()
        return !post
      }),
      thumbnail: vine.file({extnames : ["jpg", "png"], size : "10mb"}).optional(),
      content: vine.string(),
    })
  )