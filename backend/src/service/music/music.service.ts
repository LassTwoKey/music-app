import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Music, MusicDocument } from '../../schema/music.schema'

@Injectable()
export class MusicService {
    constructor(@InjectModel(Music.name) private musicModel: Model<MusicDocument>) {}

    async create(music: Music): Promise<Music> {
        const newMusic = new this.musicModel(music)
        return newMusic.save()
    }

    async findAllMusic() {
        return await this.musicModel.find().exec()
    }

    async findMusicById(id: string): Promise<Music | null> {
        return await this.musicModel.findById(id).exec()
    }

    async updateMusic(id: string, Product: Music): Promise<Music | null> {
        return await this.musicModel.findByIdAndUpdate(id, Product, { new: true })
    }

    async deleteMusic(id: string): Promise<Music | null> {
        return await this.musicModel.findOneAndDelete({ _id: id }).exec()
    }
}
