import { Controller, Request, Post, UseGuards } from '@nestjs/common'
import { AuthService } from '../../service/auth/auth.service'
import { AuthGuard } from '@nestjs/passport'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user)
    }
}
