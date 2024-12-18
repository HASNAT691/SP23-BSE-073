        //order schema 
        const mongoose = require('mongoose');

        const orderSchema = new mongoose.Schema({
            customer:{
                name:{type:String, required:true},
                street:{type:String, required:true},
                city:{type:String, required:true},
                postalCode:{type:String, required:true},

            },
            items:[
                {
                    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product', required:true},
                    quantity:{ type:Number, required:true},
                },
            ],
            total:{type:Number, required:true},
            date:{type:Date, default:Date.now},
        });

        model.exports = mongoose.model('Order', orderSchema);