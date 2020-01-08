 //requesting for display the index
const c = console.log
const {Router} = require('express')
const router = Router()
const {unlink} = require('fs-extra')
const path = require('path')
const Image = require('../models/images')
const Album = require('../models/Albumes')

const arr = []
router.get('/', (req, res)=>{
    res.render('index')
})


router.get('/gallery/pictures', async (req, res)=>{
    const image = await Image.find().sort({created_at:'desc'})
    res.render('gallery/gallery', {image})
})
//send json 
router.get('/gallery/apirest',  async(req, res)=>{
    const image = await Image.find()
    res.json(image)
})
//method post picture
router.post('/upload', async (req, res)=>{
    const image = Image()
    image.title = req.body.title.toUpperCase()
    image.description=  req.body.description
    image.filename=req.file.filename
    image.path = '/img/uploads/' + req.file.filename
    image.originalname = req.file.originalname
    image.mimetype = req.file.mimetype
    image.size= req.file.size
    image.album = req.body.album
    await image.save()
    res.redirect('/album/'+image.album)
})
router.get('/imagen/:id',  async(req, res)=>{
    const {id} = req.params
    const image = await Image.findById(id)  
    res.render('imagen/imagen', {image})
})
router.get('/image/:id/delete', async (req, res)=>{
    const {id} = req.params
    const image = await Image.findByIdAndDelete(id)
    await unlink(path.resolve('./src/public'+image.path))
    res.redirect('/album/'+image.album)
})
router.get('/image/:id/delete/allpicture', async (req, res)=>{
    const {id} = req.params
    const image = await Image.findByIdAndDelete(id)
    await unlink(path.resolve('./src/public'+image.path))
    res.redirect('/gallery/pictures')
})
//albumes control
router.get('/gallery', async (req, res)=>{
    const album = await Album.find().sort({create_at:'desc'})
    c(album.idfo)
    res.render('albumes/albumes', {album})
})
router.get('/albumes/apirest',  async(req, res)=>{
    const album = await Album.find()
    res.json(album)
})
router.post('/new/album', async (req, res)=>{
    const album = Album()
    album.title = req.body.title
    await album.save()
    res.redirect('/gallery')
})
router.get('/album/:id',  async(req, res)=>{
    const image = await Image.find({album: req.params.id}).sort({create_at:'desc'})
    const {id} = req.params
    const album = await Album.findById(id)
    res.render('albumes/albumview', {album, image})
})
router.get('/album/:id/delete', async (req, res)=>{
    const del = req.params.id
    const images = await Image.find({album:del})
    for(image of images){
        const img  = await Image.findOneAndDelete({album:del})
        await unlink(path.resolve('./src/public'+img.path))
    }
    await Album.findByIdAndDelete(del)
     res.redirect('/gallery') 
     
})
module.exports = router
