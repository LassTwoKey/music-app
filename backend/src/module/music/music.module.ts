import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from '../../controller/app/app.controller'
import { MusicController } from '../../controller/music/music.controller'
import { AppService } from '../../service/app/app.service'
import { MusicService } from '../../service/music/music.service'
import { Music, MusicSchema } from '../../schema/music.schema'

@Module({
    imports: [MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }])],
    controllers: [AppController, MusicController],
    providers: [AppService, MusicService],
})
export class MusicModule {}
