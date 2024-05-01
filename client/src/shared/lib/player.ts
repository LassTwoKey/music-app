export const convertSecondsToTime = (seconds: number) => {
    const minutes: number = Math.floor(seconds / 60)
    const remainingSeconds: number = seconds % 60
    const formattedSeconds: string =
        remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`
    return `${minutes}:${formattedSeconds}`
}
