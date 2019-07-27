'use strict'

function errorHandler(error){
    console.error(error)
    throw new Error('Fallo en la operecion del servidor')
}

module.exports = errorHandler