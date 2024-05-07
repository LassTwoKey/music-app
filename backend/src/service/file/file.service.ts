import { Injectable } from '@nestjs/common'
import * as Grid from 'gridfs-stream'
import mongoose, { Connection } from 'mongoose'

@Injectable()
export class FileService {
    // private gfs: Grid.Grid

    constructor() {
        // console.log(this.connection.db)
        // this.gfs = Grid(this.connection.db, mongoose)
    }
}
