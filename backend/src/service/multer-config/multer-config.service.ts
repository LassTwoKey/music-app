import { Injectable } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import * as Grid from 'gridfs-stream'
import mongoose from 'mongoose'
import { GridFsStorage } from 'multer-gridfs-storage'

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xbtinu8.mongodb.net/${DB_NAME}`

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any
    grf: any
    constructor() {
        this.gridFsStorage = new GridFsStorage({
            url: DB_URI,
            file: (req: any, file: any) => {
                return new Promise((resolve) => {
                    const filename = 'filename' + Math.random().toString(16).slice(2)

                    const fileInfo = {
                        filename,
                    }

                    resolve(fileInfo)
                })
            },
        })
        this.grf = Grid(mongoose.createConnection(DB_URI), mongoose)
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        }
    }

    async getFile(filename: string, res: any) {
        // const readstream = this.grf.files.find({ filename }).sort({ uploadDate: 1 })
        // return readstream

        const readstream = this.grf.createReadStream({ filename: filename })

        // Устанавливаем HTTP-заголовок для указания типа содержимого файла
        res.set('Content-Type', 'application/octet-stream')

        // Отправляем файл клиенту с помощью pipe
        readstream.pipe(res)

        // Обработка ошибок при чтении файла
        readstream.on('error', (error: any) => {
            console.error('Error reading file from GridFS:', error)
            res.status(500).send('Internal Server Error')
        })
    }
}
