import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Audio, AudioSchema } from '../../schema/audio.schema'
import { AudioController } from '../../controller/audio/audio.controller'
import { AudioService } from '../../service/audio/audio.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Audio.name, schema: AudioSchema }])],
    controllers: [AudioController],
    providers: [AudioService],
})
export class AudioModule {}
