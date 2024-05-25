import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { InfoPage } from '@/features/infoPage/ui/InfoPage'
import { AppDispatch, RootState } from '@/app/providers/StoreProvider/config/store'
import { fetchSingerPageInfoList } from '@/shared/api/info-pages'

export const SingerPage = () => {
    const { appSingerPageInfoList } = useSelector((state: RootState) => state.appSingerPageSlice)
    const dispatch = useDispatch<AppDispatch>()
    const { singerId } = useParams()


    useEffect(() => {
        dispatch(fetchSingerPageInfoList(singerId))
    }, [singerId])

    return (
           <InfoPage infoPageList={appSingerPageInfoList}/>
    )
}
