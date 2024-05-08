import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { setAppPlayerInfo } from '@/app/providers/StoreProvider/config/appPlayerSlice'
import { AppDispatch } from '@/app/providers/StoreProvider/config/store'
import { onGetAudioInfoById } from '@/shared/api/music'

import { AppPlayerSkeleton } from './AppPlayerSkeleton'
import { PlayButton } from './PlayButton'
import { PlayerInfo } from './PlayerInfo'
import { ProgressBar } from './ProgressBar'
import { VolumeButton } from './VolumeButton'

export const AppPlayer = () => {
    const {
        playerInfo: { audioUrl, name, author, duration, imgUrl, audioId },
    } = useSelector((state: RootState) => state.appPlayerSlice)
    const [isPlaying, setIsPlaying] = useState(false)
    const [appPlayerStatus] = useState('idle')
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [timeInterval, setTimeInterval] = useState<string | number | NodeJS.Timeout | undefined>()
    const [currentTime, setCurrentTime] = useState(0)
    const [isOpenAudioPlayer, setIsOpenAudioPlayer] = useState(false)
    const isOpenOrCloseAudioPlayer = isOpenAudioPlayer
        ? 'opacity-100 visible'
        : 'opacity-0 invisible'
    const audioRef = useRef<HTMLAudioElement>(null)

    // это убрать (временно тут)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (audioId) {
            setIsOpenAudioPlayer(true)
            onGetAudioInfoById(audioId).then((res) => {
                if (audioRef.current) {
                    audioRef.current.src = 'data:audio/mpeg;base64,' + res.file.buffer
                    audioRef.current.onloadedmetadata = () => {
                        dispatch(
                            setAppPlayerInfo({
                                duration: audioRef.current?.duration,
                            }),
                        )
                    }
                }
            })
        }
        clearInterval(timeInterval)
        setCurrentTime(0)
        setIsPlaying(false)
    }, [audioId])

    useEffect(() => {
        if (currentTime >= duration) {
            clearInterval(timeInterval)
            setCurrentTime(0)
            setIsPlaying(false)
        }
    }, [currentTime])

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause()
            clearInterval(timeInterval)
        } else {
            audioRef.current?.play()
            setTimeInterval(
                setInterval(() => {
                    setCurrentTime((currentTime) => currentTime + 1)
                }, 1000),
            )
        }
        setIsPlaying(!isPlaying)
    }

    const mutedMusic = () => {
        if (!audioRef.current) {
            return
        }
        if (isMuted) {
            setVolume(1)
            audioRef.current.volume = 1
        } else {
            setVolume(0)
            audioRef.current.volume = 0
        }
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (volume: number[]) => {
        setVolume(volume[0])
        if (audioRef.current) {
            audioRef.current.volume = volume[0]
        }
        setIsMuted(volume[0] === 0)
    }

    const handleTimeChange = (time: number[]) => {
        setCurrentTime(time[0])
        if (audioRef.current) {
            audioRef.current.currentTime = time[0]
        }
    }

    return (
        <>
            <div className="container ">
                <div
                    className={`bg-card py-2 px-2 border-b-2 ${isOpenOrCloseAudioPlayer} transition-opacity ease-out duration-300`}
                >
                    {appPlayerStatus === 'loading' ? (
                        <>
                            <AppPlayerSkeleton />
                        </>
                    ) : (
                        <>
                            <audio ref={audioRef} className="w-full">
                                {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                            </audio>
                            <div className="flex mb-1 justify-between items-center gap-2">
                                <PlayerInfo name={name} author={author} imgUrl={imgUrl} />
                                <div className="flex items-center">
                                    <PlayButton isPlaying={isPlaying} togglePlay={togglePlay} />
                                    <VolumeButton
                                        volume={volume}
                                        mutedMusic={mutedMusic}
                                        handleVolumeChange={handleVolumeChange}
                                    />
                                </div>
                            </div>
                            <ProgressBar
                                duration={duration}
                                handleTimeChange={handleTimeChange}
                                currentTime={currentTime}
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
