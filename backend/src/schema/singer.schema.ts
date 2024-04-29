import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type SingerDocument = Singer & Document

@Schema()
export class Singer {
    @Prop()
    name: string

    @Prop()
    imgUrl: string

    @Prop({ type: Array })
    music: []
}

export const SingerSchema = SchemaFactory.createForClass(Singer)
