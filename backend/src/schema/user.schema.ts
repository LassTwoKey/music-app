import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    username: string

    @Prop()
    password: string

    @Prop({ type: Object })
    avatar: {
        filename: string
        originalname: string
        mimetype: string
        size: number
    }
}

export const UserSchema = SchemaFactory.createForClass(User)
