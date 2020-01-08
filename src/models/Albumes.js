const {Schema, model} =  require('mongoose')
const albumSchema = new Schema({
    title:{type:String},
    create_at:{type:Date, default:Date.now()},
    idfo:{type:String, default:'fsdfdsf'}
})
module.exports = model('Album', albumSchema)