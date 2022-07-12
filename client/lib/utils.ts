export const truncate = (string: String) => {
    if (string.length > 40) return string.substring(0, 40) + "..."
    else return string
}
