import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from '../../service/user/user.service'
import { UserController } from '../../controller/user/user.controller'
import { User, UserSchema } from '../../schema/user.schema'
import { MusicService } from '../../service/music/music.service'
import { Music, MusicSchema } from '../../schema/music.schema'
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Music.name, schema: MusicSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, MusicService],
})
export class UserModule {}
