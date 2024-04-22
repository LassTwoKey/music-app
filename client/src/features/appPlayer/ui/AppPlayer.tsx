import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/app/providers/StoreProvider'
import { setAppPlayerInfo } from '@/app/providers/StoreProvider/config/appPlayerSlice'
import { convertSecondsToTime } from '@/shared/lib/player'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { Slider } from '@/shared/ui/slider'

import epicLogo from './epiclogo.jpg'

export const AppPlayer = () => {
    const {
        playerInfo: { audioUrl, name, author, duration, imgUrl },
    } = useSelector((state: RootState) => state.appPlayerSlice)
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
            dispatch(setAppPlayerInfo(inf))
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
                    setAppPlayerInfo({
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
            <input type="file" onChange={handleFileChange} />
            <div
                className={`bg-card py-2 border-b-2 ${isOpenOrCloseAudioPlayer} transition-opacity ease-out duration-300`}
            >
                <div className="container">
                    <audio ref={audioRef} className="w-full">
                        {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
                    </audio>
                    <div className="flex mb-1 justify-between items-center gap-2">
                        <div className="flex items-center">
                            <div className="w-10 h-10 overflow-hidden rounded-lg">
                                <img
                                    className="w-full h-auto"
                                    src={
                                        imgUrl ||
                                        'https://img.freepik.com/premium-vector/error-404-not-found-glitch-effect_8024-4.jpg?w=1800'
                                    }
                                    alt="Album Cover"
                                />
                            </div>
                            <div className="text ml-3 flex flex-col">
                                <h3 className="text-sm text-primary-foreground font-medium">
                                    {name || 'Unknown music name'}
                                </h3>
                                <p className="text-xs mr-8">{author || 'Unknown author'}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {isPlaying ? (
                                <Button className="px-2" onClick={togglePlay} variant="transparent">
                                    <Pause size={20} />
                                </Button>
                            ) : (
                                <Button className="px-2" onClick={togglePlay} variant="transparent">
                                    <Play size={18} />
                                </Button>
                            )}
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button className="px-2" variant="transparent">
                                            <Volume2 size={20} />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-[100vw] -translate-y-2 md:w-[150px] py-0 pl-1 pr-2 flex gap-1 items-center"
                                        side="top"
                                        align="end"
                                    >
                                        {volume === 0 ? (
                                            <Button
                                                className="p-1"
                                                onClick={mutedMusic}
                                                variant="transparent"
                                            >
                                                <VolumeX size={22} />
                                            </Button>
                                        ) : (
                                            <Button
                                                className="p-1"
                                                onClick={mutedMusic}
                                                variant="transparent"
                                            >
                                                <Volume2 size={22} onClick={mutedMusic} />
                                            </Button>
                                        )}
                                        <div className="relative w-full">
                                            <Slider
                                                defaultValue={[1]}
                                                max={1}
                                                value={[volume]}
                                                min={0}
                                                step={0.1}
                                                onValueChange={handleVolumeChange}
                                                className={cn('w-[100%] py-2')}
                                            />
                                            <Card
                                                className="absolute flex -top-5 items-center justify-center shadow-xl px-1 text-xs"
                                                style={{
                                                    left:
                                                        volume === 1
                                                            ? `calc(${volume * 100}% - 0.45rem - 20px)`
                                                            : `calc(${volume * 100}% - 0.35rem - 4px)`,
                                                }}
                                            >
                                                <p>{Math.round(volume * 100)}%</p>
                                            </Card>
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
                        <div className="relative flex items-center w-[70px] h-6 grow-0 shrink-0 text-sm">
                            <span className="absolute h-full left-0">
                                {convertSecondsToTime(currentTime)}
                            </span>
                            <span className="absolute h-full top-0 left-1/2 -translate-x-1/2">
                                /
                            </span>
                            <span className="absolute h-full top-0 right-0">
                                {convertSecondsToTime(+duration.toFixed(0))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
