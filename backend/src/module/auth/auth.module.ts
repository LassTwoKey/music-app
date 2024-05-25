import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { LocalStrategy } from './local.auth'

import { UserModule } from '../user/user.module'
import { User, UserSchema } from '../../schema/user.schema'
import { UserService } from '../../service/user/user.service'
import { AuthService } from '../../service/auth/auth.service'
import { AuthController } from '../../controller/auth/auth.controller'
import { SECRET_JWT_KEY } from '../../constants'
import { Music, MusicSchema } from '../../schema/music.schema'
import { MusicService } from '../../service/music/music.service'

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: SECRET_JWT_KEY,
            signOptions: { expiresIn: '30d' },
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Music.name, schema: MusicSchema },
        ]),
    ],
    providers: [AuthService, UserService, LocalStrategy, MusicService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}
