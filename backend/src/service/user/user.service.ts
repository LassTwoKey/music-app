import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../../schema/user.schema'

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
    async createUser(username: string, password: string, avatar: any): Promise<User> {
        return this.userModel.create({
            username,
            password,
            avatar,
        })
    }
    async getUser(query: object): Promise<User | null> {
        return this.userModel.findOne(query)
    }
    async findAllUser() {
        return await this.userModel.find().exec()
    }
}
