export const truncate = (string: String) => {
    if (string.length > 60) return string.substring(0, 60) + "..."
    else return string
}
