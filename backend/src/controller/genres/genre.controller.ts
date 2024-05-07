import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { GenreService } from '../../service/genre/genre.service'
import { Genre } from '../../schema/genre.schema'

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createGenre(@Res() response: any, @Body() genre: Genre) {
        const newGenre = await this.genreService.create(genre)
        return response.status(HttpStatus.CREATED).json({
            ...newGenre,
        })
    }

    @Get()
    async findAllGenre(@Res() response: any) {
        const genreList = await this.genreService.findAllGenres()
        return response.status(HttpStatus.OK).json(genreList)
    }

    @Get(':id')
    async findById(@Res() response: any, @Param('id') id: string) {
        const genre = await this.genreService.findGenreById(id)
        return response.status(HttpStatus.OK).json({
            ...genre,
        })
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Res() response: any, @Param('id') id: string, @Body() genre: Genre) {
        const updatedGenre = await this.genreService.updateGenre(id, genre)
        return response.status(HttpStatus.OK).json({
            ...updatedGenre,
        })
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Res() response: any, @Param('id') id: string) {
        const deletedGenre = await this.genreService.deleteGenre(id)
        return response.status(HttpStatus.OK).json({
            ...deletedGenre,
        })
    }
}
