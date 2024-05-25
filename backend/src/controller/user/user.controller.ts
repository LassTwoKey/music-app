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
        @Body('favoriteMusicIds') favoriteMusicIds: any,
    ): Promise<User | any> {
        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltOrRounds)
        const result = await this.usersService.createUser({
            username,
            password: hashedPassword,
            avatar,
            favoriteMusicIds,
        })
        return result
    }

    @UseGuards(AuthGuard)
    @Get('/users')
    async findAllUser(@Res() response: any) {
        const userList = await this.usersService.findAllUser()
        return response.status(HttpStatus.OK).json(userList)
    }

    @UseGuards(AuthGuard)
    @Delete('/users/:id')
    async deleteUser(@Res() response: any, @Param('id') id: string) {
        const deletedUser = await this.usersService.deleteUser(id)
        return response.status(HttpStatus.OK).json(deletedUser)
    }

    // favorites
    @UseGuards(AuthGuard)
    @Get('/user/favorites/:username')
    async findFavoritesByUser(@Res() response: any, @Param('username') username: string) {
        const favorites = await this.usersService.findFavoritesByUser(username)
        return response.status(HttpStatus.OK).json(favorites)
    }

    @UseGuards(AuthGuard)
    @Put('/user/favorites')
    async updateFavoritesByUser(
        @Res() response: any,
        @Body('username') username: string,
        @Body('favoriteMusicIds') favoriteMusicIds: string[],
        @Body('isDelete') isDelete: boolean,
    ) {
        const result = await this.usersService.updateFavoritesByUser({
            username,
            favoriteMusicIds,
            isDelete,
        })
        return response.status(HttpStatus.OK).json(result)
    }
}
