export const getOnlyString = (mixedArray: any[]): string[] => {
    return mixedArray.filter((item) => typeof item === 'string')
}

export const isValidObjectId = (id: string) => {
    return /^[a-fA-F0-9]{24}$/.test(id)
}
