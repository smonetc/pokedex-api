require('dotenv').config(); // <-- Shouldn't really need the config flag if no options are passes
const express = require('express'),
    app = express(),
    env = app.get('env'),
    morgan = require('morgan'),
    PORT = process.env.PORT || 8000;

// Custom imports
const {getPokeTypes} = require('./utils/pokeTypes');

console.log(process.env.API_TOKEN)

// Run morgan in dev environment only
env === 'development' ? app.use(morgan('dev')) : null // No need for morgan logging in production

function validateBearerToken(req, res, next) {
    console.log('validate bearer token middleware')
    debugger
    // move to the next middleware
    next()
}

app.use(validateBearerToken)

// get valid types from file
let validTypes = getPokeTypes();
console.log(validTypes)

function handleGetTypes(req, res) {
    res.json(validTypes)
}

app.get('/types', handleGetTypes)

function handleGetPokemon(req, res) {
    res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})
