import { Injectable, NotFoundException } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import { MongoClient } from 'mongodb'
import { GridFsStorage } from 'multer-gridfs-storage'

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xbtinu8.mongodb.net`

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any
    db: any

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
    }

    async onModuleInit() {
        this.db = await MongoClient.connect(DB_URI, {}).then((client) => client.db(DB_NAME))
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        }
    }

    async getFile(filename: string, res: any) {
        const file = await this.db.collection('fs.files').findOne({ filename: filename })
        if (!file) {
            throw new NotFoundException()
        }

        const downloadStream = this.db.collection('fs.chunks').find({ files_id: file._id })

        res.set('Content-Type', file.contentType)
        downloadStream.toArray((err: Error, chunks: any[]) => {
            if (err) {
                throw err
            }

            if (chunks.length === 0) {
                throw new NotFoundException()
            }

            const fileData = chunks.reduce(
                (prev: Buffer[], current: any) => prev.concat(current.data.buffer),
                [],
            )
            const fileBuffer = Buffer.concat(fileData)
            res.send(fileBuffer)
        })
    }
}
