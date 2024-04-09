import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { UserService } from '../../service/user/user.service'
import { User } from '../../schema/user.schema'
import * as bcrypt from 'bcrypt'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/auth.guard'

@Controller('auth')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('/signup')
    @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
    async createUser(
        @UploadedFiles()
        files: { avatar?: Express.Multer.File[] },
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User> {
        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        const result = await this.usersService.createUser(username, hashedPassword, files?.avatar)
        return result
    }

    @UseGuards(AuthGuard)
    @Get('/users')
    async findAllUser(@Res() response: any) {
        const musicList = await this.usersService.findAllUser()
        return response.status(HttpStatus.OK).json({
            musicList,
        })
    }
}
