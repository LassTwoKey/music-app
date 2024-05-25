import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {fetchGenrePageInfoList} from '@/shared/api/info-pages'
import { useDispatch,useSelector} from "react-redux"
import { AppDispatch, RootState } from "@/app/providers/StoreProvider/config/store"
import { InfoPage } from "@/features/infoPage/ui/InfoPage"

export const GenrePage = () => {
    const {genreId} = useParams()
    const {appGenrePageInfoList} = useSelector((state:RootState)=> state.appGenresPageSlice)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGenrePageInfoList(genreId))
    },[genreId])
    return (
         <InfoPage infoPageList={appGenrePageInfoList}/>
    )
}
