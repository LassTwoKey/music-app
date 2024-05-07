import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GenreController } from '../../controller/genres/genre.controller'
import { Genre, GenreSchema } from '../../schema/genre.schema'
import { GenreService } from '../../service/genre/genre.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }])],
    controllers: [GenreController],
    providers: [GenreService],
})
export class GenreModule {}
