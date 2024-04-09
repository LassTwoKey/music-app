import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import 'dotenv/config'

import { MusicModule } from '../music/music.module'
import { AuthModule } from '../auth/auth.module'

const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xbtinu8.mongodb.net/${DB_NAME}`

@Module({
    imports: [MongooseModule.forRoot(DB_URI), MusicModule, AuthModule],
})
export class AppModule {}
