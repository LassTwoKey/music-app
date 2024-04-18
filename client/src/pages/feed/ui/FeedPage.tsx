import { CarouselBlock } from '@/features/carouselBlock'
import { musicInfo, singerInfo,songsInfo} from '@/shared/lib/carouselInfo'

export const FeedPage = () => {
    return (
        <>
            <section className="pt-3">
                <CarouselBlock slidesInfo={musicInfo} typeCarousel="media" nameSection = 'Made For You' />
            </section>
            <section className="pt-5">
                <CarouselBlock slidesInfo={singerInfo} typeCarousel="singer" nameSection='Popular singer' />
            </section>
            <section className='pt-5'>
                <CarouselBlock slidesInfo={songsInfo} typeCarousel='media' nameSection = 'Favorite song'/>
            </section>
        </>
    )
}
