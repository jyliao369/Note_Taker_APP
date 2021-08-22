// This function will helpe create a string or random
// number and letters that will create an id
module.exports = () =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);