import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type GenreDocument = HydratedDocument<Genre>

@Schema()
export class Genre {
    @Prop()
    name: string

    @Prop({ type: Array })
    music: []
}

export const GenreSchema = SchemaFactory.createForClass(Genre)
