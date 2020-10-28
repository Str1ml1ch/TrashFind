const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    mapX: {type: Number,required:true},
    mapY: {type:Number,required:true},
    date: {type:Date,default: Date.now},
    city: {type: String, required:true},
    link: {type:String,required:true},
    describe: {type: String,required:true},
    owner: {type: Types.ObjectId, ref: 'User'},
    status: {type: Boolean,require:true}
})

module.exports = model('Maps',schema)