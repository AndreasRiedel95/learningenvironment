const settings = require('./settings.json');

module.exports = () => {
    for ( let i in settings ) {
        process.env[i] = settings[i];
    }
}