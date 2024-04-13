import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { setPlayerInfo } from '@/app/providers/StoreProvider/config/playerSlice'
import { convertSecondsToTime } from '@/shared/lib/player'
import { cn } from '@/shared/lib/utils'
import { Card } from '@/shared/ui/card'
import { Slider } from '@/shared/ui/slider'

export const Player = () => {
    const {
        playerInfo: { audioUrl, name, author, duration, imgUrl },
    } = useSelector((state: RootState) => state.playerSlice)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [timeInterval, setTimeInterval] = useState<string | number | NodeJS.Timeout | undefined>()
    const [currentTime, setCurrentTime] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)

    // это убрать (временно тут)
    const dispatch = useDispatch()

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target?.files) return

        const file = event.target.files[0]

        const reader = new FileReader()
        reader.onload = function () {
            const inf = {
                audioUrl: reader.result,
                name: file.name,
                size: file.size,
                duration: 0,
                imgUrl: 'https://thicc-af.mywaifulist.moe/waifus/makima/YlEvAFSWo7WrlgXmwIRyksCooOxsX1rVCqxUN4Vz.png?class=thumbnail',
            }
            dispatch(setPlayerInfo(inf))
        }
        reader.readAsDataURL(file)
    }
    // =========================

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl

            // это убрать (временно тут)
            dispatch(
                setPlayerInfo({
                    duration: audioRef.current.duration,
                }),
            )
            // =========================
        }
    }, [audioUrl, dispatch])

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl
        }

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
            audioRef.current.muted = false
        } else {
            audioRef.current.muted = true
        }
        setIsMuted(!isMuted)
    }

    const handleTimeChange = (time: number[]) => {
        setCurrentTime(time[0])
        if (audioRef.current) {
            audioRef.current.currentTime = time[0]
        }
    }

    return (
        <div className="container">
            <input type="file" onChange={handleFileChange} />
            <Card className="px-2">
                <audio ref={audioRef} className="w-full">
                    {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                </audio>
                <div className="flex justify-between items-center px-2 py-2 gap-2">
                    <div className="flex items-center">
                        <div className="w-20 overflow-hidden rounded-lg">
                            <img className="w-full h-auto" src={imgUrl} alt="Album Cover" />
                        </div>
                        <div className="text ml-3 flex items-center flex-col justify-center gap-2">
                            <h3 className="text-sm text-primary-foreground font-medium">
                                {name || 'Unknown music name'}
                            </h3>
                            <p className="text-xs mr-8">{author || 'Unknown author'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isPlaying ? (
                            <Pause size={20} onClick={togglePlay} />
                        ) : (
                            <Play size={20} onClick={togglePlay} />
                        )}
                        {isMuted ? (
                            <VolumeX size={20} onClick={mutedMusic} />
                        ) : (
                            <Volume2 size={20} onClick={mutedMusic} />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Slider
                        defaultValue={[0]}
                        value={[currentTime]}
                        onValueChange={handleTimeChange}
                        max={duration}
                        step={1}
                        className={cn('w-[100%] py-2')}
                    />
                    <div className="flex items-center gap-1">
                        <span>{convertSecondsToTime(currentTime)}</span> /{' '}
                        <span>{convertSecondsToTime(+duration.toFixed(0))}</span>
                    </div>
                </div>
            </Card>
        </div>
    )
}
