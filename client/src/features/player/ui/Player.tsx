import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { setPlayerInfo } from '@/app/providers/StoreProvider/config/playerSlice'
import { convertSecondsToTime } from '@/shared/lib/player'
import { cn } from '@/shared/lib/utils'
import { Card } from '@/shared/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'

import epicLogo from './epiclogo.jpg'

export const Player = () => {
    const {
        playerInfo: { audioUrl, name, author, duration, imgUrl },
    } = useSelector((state: RootState) => state.playerSlice)
    const [isPlaying, setIsPlaying] = useState(false)
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
                imgUrl: epicLogo,
            }
            dispatch(setPlayerInfo(inf))
        }
        reader.readAsDataURL(file)
    }
    // =========================

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl
            setIsOpenAudioPlayer(true)
            setCurrentTime(0)

            // это убрать (временно тут)
            audioRef.current.onloadedmetadata = () => {
                dispatch(
                    setPlayerInfo({
                        duration: audioRef.current?.duration,
                    }),
                )
            }
            // =========================
        }
    }, [audioUrl])

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
            audioRef.current.muted = false
            setVolume(1)
            audioRef.current.volume = 1
        } else {
            audioRef.current.muted = true

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
            <Card
                className={`px-2 ${isOpenOrCloseAudioPlayer} transition-opacity ease-out duration-300`}
            >
                <audio ref={audioRef} className="w-full">
                    {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                </audio>
                <div className="flex justify-between items-center px-2 py-2 gap-2">
                    <div className="flex items-center">
                        <div className="w-20 overflow-hidden rounded-lg">
                            <img
                                className="w-full h-auto"
                                src={
                                    imgUrl ||
                                    'https://img.freepik.com/premium-vector/error-404-not-found-glitch-effect_8024-4.jpg?w=1800'
                                }
                                alt="Album Cover"
                            />
                        </div>
                        <div className="text ml-3 flex flex-col gap-2">
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
                        <div className="slider">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Volume2 size={20} />
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-[150px] flex gap-1 items-center"
                                    side="top"
                                >
                                    {volume === 0 ? (
                                        <VolumeX size={20} onClick={mutedMusic} />
                                    ) : (
                                        <Volume2 size={20} onClick={mutedMusic} />
                                    )}
                                    <div className="slider relative w-full">
                                        <Slider
                                            defaultValue={[1]}
                                            max={1}
                                            value={[volume]}
                                            min={0}
                                            step={0.1}
                                            onValueChange={handleVolumeChange}
                                            className={cn('w-[100%]  py-2')}
                                        />
                                        <div
                                            className="absolute flex items-center justify-center w-6 h-6 bg-card  text-xs"
                                            style={{
                                                left:
                                                    volume === 1
                                                        ? `calc(${volume * 100}% - 0.45rem - 10px)`
                                                        : `calc(${volume * 100}% - 0.35rem - 4px)`,
                                                top: '-2rem',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                                            }}
                                        >
                                            <p>{Math.round(volume * 100)}%</p>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
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
