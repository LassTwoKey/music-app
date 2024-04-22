import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common'
import { UserService } from '../../service/user/user.service'
import { User } from '../../schema/user.schema'
import * as bcrypt from 'bcrypt'
import { AuthGuard } from '../auth/auth.guard'

@Controller('auth')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('/signup')
    async createUser(
        @Body('password')
        password: string,
        @Body('username') username: string,
        @Body('avatar') avatar: string,
    ): Promise<User> {
        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        const result = await this.usersService.createUser(username, hashedPassword, avatar)
        return result
    }

    @UseGuards(AuthGuard)
    @Get('/users')
    async findAllUser(@Res() response: any) {
        const userList = await this.usersService.findAllUser()
        return response.status(HttpStatus.OK).json({
            userList,
        })
    }

    @UseGuards(AuthGuard)
    @Delete('/users/:id')
    async delete(@Res() response: any, @Param('id') id: string) {
        const deletedUser = await this.usersService.deleteUser(id)
        return response.status(HttpStatus.OK).json({
            deletedUser,
        })
    }
}
