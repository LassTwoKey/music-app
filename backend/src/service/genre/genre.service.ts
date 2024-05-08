import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Genre, GenreDocument } from '../../schema/genre.schema'
import { Model } from 'mongoose'

@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre.name) private genreModel: Model<GenreDocument>) {}

    async create(genre: Genre): Promise<any> {
        const newGenre = new this.genreModel(genre)

        const savedGenre = newGenre.save()

        return {
            status: 'successfully created',
            id: (await savedGenre)._id,
            name: (await savedGenre)?.name,
            imgUrl: (await savedGenre)?.imgUrl,
            musicIds: (await savedGenre)?.music.map((item: any) => item.id),
        }
    }

    async findAllGenres() {
        const genreList = await this.genreModel.find().exec()

        if (Array.isArray(genreList)) {
            return genreList.map((genre) => ({
                id: genre._id,
                name: genre?.name,
                imgUrl: genre?.imgUrl,
                music: genre?.music,
            }))
        }

        return []
    }

    async findGenreById(id: string): Promise<any> {
        const findedGenre = await this.genreModel.findById(id).exec()
        if (findedGenre) {
            return {
                id: findedGenre._id,
                name: findedGenre?.name,
                imgUrl: findedGenre?.imgUrl,
                music: findedGenre?.music,
            }
        }

        return {
            status: 'not finded',
        }
    }

    async updateGenre(id: string, genre: Genre): Promise<any> {
        const updatedGenre = await this.genreModel.findByIdAndUpdate(id, genre, { new: true })

        if (updatedGenre) {
            return {
                id: updatedGenre?._id,
                name: updatedGenre?.name,
                imgUrl: updatedGenre?.imgUrl,
                musicIds: updatedGenre?.music.map((item: any) => item.id),
            }
        }

        return {
            status: 'not updated',
        }
    }

    async deleteGenre(id: string): Promise<any> {
        const deletedGenre = await this.genreModel.findOneAndDelete({ _id: id }).exec()
        return {
            status: 'successfully deleted',
            id: deletedGenre?._id,
            name: deletedGenre?.name,
            imgUrl: deletedGenre?.imgUrl,
            musicIds: deletedGenre?.music.map((item: any) => item.id),
        }
    }
}
