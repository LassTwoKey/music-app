import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../../schema/user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
    async createUser(username: string, password: string): Promise<User> {
        return this.userModel.create({
            username,
            password,
        })
    }
    async getUser(query: object): Promise<User | null> {
        return this.userModel.findOne(query)
    }
}
