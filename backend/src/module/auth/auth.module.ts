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

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: SECRET_JWT_KEY,
            signOptions: { expiresIn: '60s' },
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [AuthService, UserService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
