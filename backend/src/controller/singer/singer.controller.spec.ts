import { Test, TestingModule } from '@nestjs/testing'
import { SingerController } from './singer.controller'

describe('SingerController', () => {
    let controller: SingerController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SingerController],
        }).compile()

        controller = module.get<SingerController>(SingerController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
