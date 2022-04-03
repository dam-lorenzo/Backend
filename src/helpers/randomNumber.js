function randomNumber(end=20) {
    const max = end+1
    const min = 1
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = { randomNumber }