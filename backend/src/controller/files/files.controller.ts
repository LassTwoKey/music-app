import {
    Post,
    Controller,
    UseInterceptors,
    UploadedFile,
    Logger,
    Get,
    Param,
    Res,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { GridFsMulterConfigService } from '../../service/multer-config/multer-config.service'

@Controller('api/files')
export class FilesController {
    constructor(private readonly fileService: GridFsMulterConfigService) {}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file: any) {
        Logger.debug(file, 'FILE UPLOADER')
        return file
    }

    @Get(':filename')
    async createProduct(@Param('filename') filename: string, @Res() res: any) {
        const streamedFile = await this.fileService.getFile(filename, res)
        return { streamedFile }
    }
}
