import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Music, MusicDocument } from '../../schema/music.schema'

@Injectable()
export class MusicService {
    constructor(@InjectModel(Music.name) private musicModel: Model<MusicDocument>) {}

    async create(music: Music): Promise<any> {
        const newMusic = new this.musicModel(music)

        const savedMusic = newMusic.save()

        return {
            status: 'successfully created',
            id: (await savedMusic)._id,
            name: (await savedMusic)?.name,
            author: (await savedMusic)?.author,
            audioId: (await savedMusic)?.audioId,
            genres: (await savedMusic)?.genres,
        }
    }

    async findAllMusic() {
        const musicList = await this.musicModel.find().exec()

        if (Array.isArray(musicList)) {
            return musicList.map((music) => ({
                id: music._id,
                name: music?.name,
                author: music?.author,
                audioId: music?.audioId,
                genres: music?.genres,
            }))
        }

        return []
    }

    async findMusicById(id: string): Promise<any> {
        const findedMusic = await this.musicModel.findById(id).exec()
        if (findedMusic) {
            return {
                id: findedMusic._id,
                name: findedMusic?.name,
                author: findedMusic?.author,
                audioId: findedMusic?.audioId,
                genres: findedMusic?.genres,
            }
        }

        return {
            status: 'not updated',
        }
    }

    async updateMusic(id: string, Product: Music): Promise<any> {
        const music = await this.musicModel.findByIdAndUpdate(id, Product, { new: true })

        if (music) {
            return {
                id: music._id,
                name: music?.name,
                author: music?.author,
                audioId: music?.audioId,
                genres: music?.genres,
            }
        }

        return {
            status: 'not updated',
        }
    }

    async deleteMusic(id: string): Promise<any> {
        const deletedMusic = await this.musicModel.findOneAndDelete({ _id: id }).exec()
        return {
            status: 'successfully deleted',
            id: deletedMusic?._id,
            name: deletedMusic?.name,
            author: deletedMusic?.author,
            audioId: deletedMusic?.audioId,
            genres: deletedMusic?.genres,
        }
    }
}
