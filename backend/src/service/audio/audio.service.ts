import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Audio, AudioDocument } from '../../schema/audio.schema'

@Injectable()
export class AudioService {
    constructor(@InjectModel(Audio.name) private audioModel: Model<AudioDocument>) {}

    async findAllAudio() {
        const audioList = await this.audioModel.find().exec()

        if (Array.isArray(audioList)) {
            return audioList.map((audio) => ({
                id: audio._id,
                name: audio?.file?.originalname,
                size: audio?.file?.size,
            }))
        }

        return []
    }

    async findAudioFileById(id: string): Promise<any> {
        const findedAudio = await this.audioModel.findById(id).exec()
        return {
            id: findedAudio?._id,
            file: findedAudio?.file,
        }
    }

    async createAudioFile(file: Express.Multer.File): Promise<any> {
        const newAudio = new this.audioModel({ file })

        const savedAudio = newAudio.save()
        return {
            status: 'successfully created',
            id: (await savedAudio)._id,
            name: (await savedAudio)?.file?.originalname,
            size: (await savedAudio)?.file?.size,
        }
    }

    async deleteAudio(id: string): Promise<any> {
        const deletedAudio = await this.audioModel.findOneAndDelete({ _id: id }).exec()
        if (deletedAudio) {
            return {
                status: 'successfully deleted',
                id: deletedAudio._id,
                name: deletedAudio?.file?.originalname,
                size: deletedAudio?.file?.size,
            }
        }

        return {
            status: 'not deleted',
        }
    }
}
