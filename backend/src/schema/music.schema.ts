import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type MusicDocument = HydratedDocument<Music>

@Schema()
export class Music {
    @Prop()
    name: string

    @Prop()
    author: string

    @Prop()
    audioId: string

    @Prop()
    imgUrl: string

    @Prop()
    genres: string[]
}

export const MusicSchema = SchemaFactory.createForClass(Music)
