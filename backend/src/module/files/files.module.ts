import { Module } from '@nestjs/common'
import { FilesController } from '../../controller/files/files.controller'
import { MulterModule } from '@nestjs/platform-express'
import { GridFsMulterConfigService } from '../../service/multer-config/multer-config.service'

@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
    ],
    controllers: [FilesController],
    providers: [GridFsMulterConfigService],
})
export class FilesModule {}
