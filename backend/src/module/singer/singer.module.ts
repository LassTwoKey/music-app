import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Singer, SingerSchema } from '../../schema/singer.schema'
import { SingerController } from '../../controller/singer/singer.controller'
import { SingerService } from '../../service/singer/singer.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Singer.name, schema: SingerSchema }])],
    controllers: [SingerController],
    providers: [SingerService],
})
export class SingerModule {}
