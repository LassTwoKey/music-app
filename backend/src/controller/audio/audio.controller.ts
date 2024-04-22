import {
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AudioService } from '../../service/audio/audio.service'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('audio')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

    @Get()
    async findAllAudio(@Res() response: any) {
        const audioList = await this.audioService.findAllAudio()
        return response.status(HttpStatus.OK).json(audioList)
    }

    @Get(':id')
    async findMusicFileById(@Res() response: any, @Param('id') id: string) {
        const audioFile = await this.audioService.findAudioFileById(id)
        return response.status(HttpStatus.OK).json({
            ...audioFile,
        })
    }

    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createMusicFile(@Res() response: any, @UploadedFile() file: Express.Multer.File) {
        const newAudio = await this.audioService.createAudioFile(file)
        return response.status(HttpStatus.CREATED).json({
            ...newAudio,
        })
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteAudio(@Res() response: any, @Param('id') id: string) {
        const deletedAudio = await this.audioService.deleteAudio(id)
        return response.status(HttpStatus.OK).json({
            ...deletedAudio,
        })
    }
}
