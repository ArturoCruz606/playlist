import express from 'express'
const router = express.Router()
import Playlist from '../models/playlist.model'
// let Playlist = [
//     {
//         "nombre": "lol",
//         "descripcion": "a",
//         "canciones": [
//             {
//                 "titulo": "veil",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2019
//             },
//             {
//                 "titulo": "nose",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2000
//             }
//         ]
//     },
//     {
//         "nombre": "ligoleyen",
//         "descripcion": "aeiou",
//         "canciones": [
//             {
//                 "titulo": "esetera",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2019
//             },
//             {
//                 "titulo": "a",
//                 "artista": "no se",
//                 "album": "nu se",
//                 "año": 2000
//             }
//         ]
//     }
// ]

router.get('/lists', async (request, response) => {
    try {
        const lista = await Playlist.find()
        response.send(lista)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(lista)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.post('/lists', async (request, response) => {
    try {
        const playlist = request.body
        await Playlist.create(playlist)
        response.status(201).send(playlist)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let lista = request.body
        await Playlist.findOneAndUpdate({ nombre: nombrePlaylist }, lista)
        const listaResponse = await Playlist.findOne({ nombre: nombrePlaylist })
        response.send(listaResponse)
    } catch (err) {
        response.status(500).send(err)
    }
})
router.delete('/lists/:nombre', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        await Playlist.findOneAndRemove( {nombre: nombrePlaylist} )
        response.status(204).send()
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        const lista = Playlist.findOne( {nombre: nombrePlaylist} )
        response.send(lista.canciones)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.get('/lists/:nombre/songs/:titulo', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        const cancion = await lista.canciones.find(x => x.nombre == nombrePlaylist)
        response.send(cancion)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.post('/lists/:nombre/songs', async (request, response) => {
    try {
        let nombrePlaylist = request.params.nombre
        let cancion = request.body
        const lista = await Playlist.findOne( {nombre: nombrePlaylist} )
        lista.canciones.push(cancion)
        await Playlist.findOneAndUpdate({nombre: nombrePlaylist}, lista)
        response.status(201).send(lista)
    } catch (err) {
        response.status(500).send(err)
    }
})

router.put('/lists/:nombre/songs/:titulo', async (request, response) => {
    try{
        let nombrePlaylist = request.params.nombre
        let tituloCancion = request.params.titulo
    }catch (err) {
        response.status(500).send(err)
    }
})

router.delete('/lists/:nombre/songs/:titulo', (request, response) => {
    
})

export default router