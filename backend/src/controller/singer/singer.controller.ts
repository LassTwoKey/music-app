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
import { SingerService } from '../../service/singer/singer.service'
import { Singer } from '../../schema/singer.schema'

@Controller('singer')
export class SingerController {
    constructor(private readonly singerService: SingerService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createSinger(@Res() response: any, @Body() singer: Singer) {
        const newSinger = await this.singerService.create(singer)
        return response.status(HttpStatus.CREATED).json({
            ...newSinger,
        })
    }

    @Get()
    async findAllSingers(@Res() response: any) {
        const singers = await this.singerService.findAllSingers()
        return response.status(HttpStatus.OK).json(singers)
    }

    @Get(':id')
    async findById(@Res() response: any, @Param('id') id: string) {
        const singer = await this.singerService.findSingerById(id)
        return response.status(HttpStatus.OK).json({
            ...singer,
        })
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Res() response: any, @Param('id') id: string, @Body() singer: Singer) {
        const updatedSinger = await this.singerService.updateSinger(id, singer)
        return response.status(HttpStatus.OK).json({
            ...updatedSinger,
        })
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Res() response: any, @Param('id') id: string) {
        const deletedSinger = await this.singerService.deleteSinger(id)
        return response.status(HttpStatus.OK).json({
            ...deletedSinger,
        })
    }
}
