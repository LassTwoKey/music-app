import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from '../../schema/user.schema'
import { MusicService } from '../music/music.service'
import { isValidObjectId } from '../../utils'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly musicService: MusicService,
    ) {}
    async createUser({
        username,
        password,
        avatar,
        favoriteMusicIds,
    }: {
        username: string
        password: string
        avatar: string
        favoriteMusicIds: string[]
    }): Promise<User | any> {
        const createdUser = this.userModel.create({
            username,
            password,
            avatar: avatar || '',
            favoriteMusicIds: favoriteMusicIds.length
                ? favoriteMusicIds.filter((id: string) => isValidObjectId(id))
                : [],
        })

        return {
            status: 'successfully created',
            id: (await createdUser)._id,
            username: (await createdUser).username,
            password: (await createdUser).password,
            avatar: (await createdUser).avatar,
            favoriteMusicIds: (await createdUser).favoriteMusicIds,
        }
    }
    async getUser(query: object): Promise<User | null> {
        return this.userModel.findOne(query)
    }
    async findAllUser() {
        const users = await this.userModel.find().exec()
        if (Array.isArray(users)) {
            return users.map((user) => ({
                id: user._id,
                username: user?.username,
                password: user.password,
                avatar: user?.avatar,
                favoriteMusicIds: user?.favoriteMusicIds,
            }))
        }

        return []
    }
    async deleteUser(id: string): Promise<any> {
        const deletedUser = await this.userModel.findOneAndDelete({ _id: id }).exec()

        if (!deletedUser) {
            return {
                status: 'error',
            }
        }

        return {
            status: 'successfully deleted',
            id: deletedUser?._id,
            username: deletedUser?.username,
            password: deletedUser?.password,
            avatar: deletedUser?.avatar,
            favoriteMusicIds: deletedUser?.favoriteMusicIds,
        }
    }
    async findFavoritesByUser(username: string): Promise<any> {
        const findedUser = await this.userModel.findOne({ username }).exec()

        if (!findedUser) {
            return {
                status: 'error',
                message: 'User is not found',
            }
        }

        const ids = findedUser.favoriteMusicIds

        const favorites = await this.musicService.findMusicByIds(ids)

        return favorites
    }
    async updateFavoritesByUser({
        username,
        favoriteMusicIds,
        isDelete,
    }: {
        username: string
        favoriteMusicIds: string[]
        isDelete: boolean
    }): Promise<any> {
        favoriteMusicIds = favoriteMusicIds.filter((id: string) => isValidObjectId(id))

        const findedUser = await this.userModel.findOne({ username }).exec()

        if (!findedUser) {
            return {
                status: 'error',
                message: 'User is not found',
            }
        }

        if (!Array.isArray(favoriteMusicIds)) {
            return {
                status: 'error',
                message: 'favoriteMusicIds must be an array',
            }
        }

        let music = null

        if (isDelete) {
            const filteredIds = findedUser.favoriteMusicIds.filter(
                (item) => !favoriteMusicIds.includes(item),
            )

            music = await this.userModel.findOneAndUpdate(
                { username },
                { favoriteMusicIds: filteredIds },
                { new: true },
            )
        } else {
            const uniqueIds = [...new Set([...findedUser.favoriteMusicIds, ...favoriteMusicIds])]

            music = await this.userModel.findOneAndUpdate(
                { username },
                { favoriteMusicIds: uniqueIds },
                { new: true },
            )
        }

        return music
    }
}
