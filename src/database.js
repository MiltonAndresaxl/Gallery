const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/imageSave', {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db => console.log('connect to mongDB'))
.catch(db => console.log('error connect to mongDB'))