import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type AudioDocument = HydratedDocument<Audio>

@Schema()
export class Audio {
    @Prop({ type: Object })
    file: {
        fieldname: string
        originalname: string
        encoding: string
        mimetype: string
        buffer: any
        size: number
    }
}

export const AudioSchema = SchemaFactory.createForClass(Audio)
