export const Spinner = () => {
    return (
        <div className="flex justify-center items-center h-full pt-52">
            <div className="flex flex-row gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce animation-delay-300"></div>
                <div className="w-6 h-6 rounded-full bg-blue-700 animate-bounce animation-delay-500"></div>
            </div>
        </div>
    )
}
