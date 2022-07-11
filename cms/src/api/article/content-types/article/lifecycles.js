const removeMd = require("remove-markdown")

// in seconds
const calculateReadTime = (text) => {
    const avgWpm = 240
    const numWords = text.trim().split(/\s+/).length
    return Math.ceil(numWords / avgWpm * 60)
}

const updateReadTime = (event) => {
    const cleaned = removeMd(event.params.data.content)
    event.params.data.duration = calculateReadTime(cleaned)
}

module.exports = {
    beforeCreate(event) {
        updateReadTime(event)
    },
    beforeUpdate(event) {
        updateReadTime(event)
    }
};
