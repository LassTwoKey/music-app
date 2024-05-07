import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

import { fetchSingerInfoList,fetchMediaInfoList } from '@/shared/api/carusel'
import { fetchMusicInfoList } from '@/shared/api/music'
import { RootState } from '@/app/providers/StoreProvider'
import { CarouselBlock } from '@/features/carusel/ui/caruselBlock'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store'

export const FeedPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {appSingerInfoList} = useSelector((state:RootState)=> state.appSingerSlice)
    const {musicInfoList} = useSelector((state:RootState)=> state.appPlayerStatus)
    const {appMedianfoList} = useSelector((state:RootState)=> state.appMediaSlise)
    

    useEffect(() => {
        dispatch(fetchSingerInfoList())
        dispatch(fetchMusicInfoList())
        dispatch(fetchMediaInfoList())
    }, [])

    return (
        <>
            <section className="pt-5">
                <CarouselBlock  slidesInfo = {appSingerInfoList} typeCarousel = 'singer' nameSection = 'Section' />
            </section>
            <section className="pt-5">
                <CarouselBlock  slidesInfo = {musicInfoList} typeCarousel = 'music' nameSection = 'Section' />
            </section>
            <section className="pt-5">
                <CarouselBlock  slidesInfo = {appMedianfoList} typeCarousel = 'media' nameSection = 'Section' />
            </section>
        </>
    )
}