import { FC } from 'react'

interface PlayerInfoProps {
    name: string | null
    imgUrl: string | null
    author: string | null
}

export const PlayerInfo: FC<PlayerInfoProps> = ({ name, imgUrl, author }) => {
    return (
        <>
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
        </>
    )
}
