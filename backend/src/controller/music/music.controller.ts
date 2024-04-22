import {
    Controller,
    Get,
    Param,
    Res,
    HttpStatus,
    Body,
    Post,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common'
import { MusicService } from '../../service/music/music.service'
import { Music } from '../../schema/music.schema'
import { AuthGuard } from '../auth/auth.guard'

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createProduct(@Res() response: any, @Body() product: Music) {
        const newMusic = await this.musicService.create(product)
        return response.status(HttpStatus.CREATED).json({
            ...newMusic,
        })
    }

    @Get()
    async findAllMusic(@Res() response: any) {
        const musicList = await this.musicService.findAllMusic()
        return response.status(HttpStatus.OK).json(musicList)
    }

    @Get(':id')
    async findById(@Res() response: any, @Param('id') id: string) {
        const music = await this.musicService.findMusicById(id)
        return response.status(HttpStatus.OK).json({
            ...music,
        })
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Res() response: any, @Param('id') id: string, @Body() music: Music) {
        const updatedMusic = await this.musicService.updateMusic(id, music)
        return response.status(HttpStatus.OK).json({
            ...updatedMusic,
        })
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Res() response: any, @Param('id') id: string) {
        const deletedMusic = await this.musicService.deleteMusic(id)
        return response.status(HttpStatus.OK).json({
            ...deletedMusic,
        })
    }
}
