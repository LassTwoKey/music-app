import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Singer, SingerDocument } from '../../schema/singer.schema'
import { Model } from 'mongoose'

@Injectable()
export class SingerService {
    constructor(@InjectModel(Singer.name) private singerModel: Model<SingerDocument>) {}

    async create(singer: any): Promise<any> {
        const newSinger = new this.singerModel(singer)

        const savedSinger = newSinger.save()

        return {
            status: 'successfully created',
            id: (await savedSinger)._id,
            name: (await savedSinger).name,
            music: (await savedSinger).music,
        }
    }

    async findAllSingers() {
        const singers = await this.singerModel.find().exec()

        if (Array.isArray(singers)) {
            return singers.map((singer) => ({
                id: singer._id,
                name: singer?.name,
                music: singer?.music,
            }))
        }

        return []
    }

    async findSingerById(id: string): Promise<any> {
        const findedSinger = await this.singerModel.findById(id).exec()
        if (findedSinger) {
            return {
                id: findedSinger._id,
                name: findedSinger?.name,
                author: findedSinger?.music,
            }
        }

        return {
            status: 'not updated',
        }
    }

    async updateSinger(id: string, singer: Singer): Promise<any> {
        const updatedSinger = await this.singerModel.findByIdAndUpdate(id, singer, { new: true })

        if (updatedSinger) {
            return {
                status: 'successfully updated',
                id: updatedSinger?._id,
                name: updatedSinger?.name,
                music: updatedSinger?.music,
            }
        }

        return {
            status: 'not updated',
        }
    }

    async deleteSinger(id: string): Promise<any> {
        const deletedSinger = await this.singerModel.findOneAndDelete({ _id: id }).exec()
        return {
            status: 'successfully deleted',
            id: deletedSinger?._id,
            name: deletedSinger?.name,
            music: deletedSinger?.music,
        }
    }
}
