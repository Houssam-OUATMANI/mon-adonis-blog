import { MultipartFile } from "@adonisjs/core/bodyparser"
import { cuid } from "@adonisjs/core/helpers"
import app from "@adonisjs/core/services/app"
import { writeFile } from "fs/promises"
import { toPng } from "jdenticon"

export default class FileUploaderService {


    async upload(thumbnail : MultipartFile | undefined, identiconName : string, path : string  ) {

        if(!thumbnail) {
            const png = toPng(identiconName, 100)
            await writeFile(`public/${path}/${identiconName}.png`, png)
        }

        else {
            await thumbnail.move(app.makePath(`public/${path}`), {name : `${cuid()}.${thumbnail.extname}`})
        }

        return `${path}/${thumbnail?.fileName || identiconName + ".png"}`
    }
}