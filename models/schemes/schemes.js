const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: { type: String, required: true },
    sign: { type: String, required: true },
    color: { type: String, required: true },
    count: { type: Number, required: true },
    subCategories: {
        type: Object,
        of : {
            name: { type: String, required: true },
            sign: { type: String, required: true },
            color: { type: String, required: true },
            count: { type: Number, required: true }
        }
    }
})

const accountSchema = new Schema({
    accountName: { type: String, required: true },
    accountType: { type: String, required: true },
    count: { type: Number, required: true },
    keeperName: { type: String, required: true },
    toTotal: { type: Boolean, required: true }
})

const contributionSchema = new Schema({
    img: { type: String, required: true },
    count: { type: Number, required: true },
    percent: { type: Number, required: true },
    bankName: { type: String, required: true },
    contributionType: { type: String, required: true },
})

const investmentSchema = new Schema({
    img: { type: String, required: true },
    count: { type: Number, required: true },
    companyName: { type:String, required:true }
})

const debtSchema = new Schema({
    img:{type : String,required:true},
    debtTarget:{type : String,required:true},
    debtType:{type : String,required:true},
    progress:{type : [Number],required:true},
    deadLine:{type : Date,required:true}
})

const purposeSchema = new Schema ({
    img:{type : String,required:true},
    progress:{type : [Number],required:true},
    purposeName:{type : String,required:true},
    deadLine:{type : Date,required:true}
})

const transactionSchema = new Schema ({
    transactionType: {type: String, required: true},
    date: {type: Date, required: true},
    account: {
        type: Object,
        of: {
            _id: Schema.Types.ObjectId,
            accountName: String,
            keeperName: String,
        },
        required: true
    },
    transferAccount: {_id: String, accountName: String, keeperName: String},
    count: {type: Number, required: true},
    message: String,
    category: {
        type: Object,
        of : {
            name: { type: String, required: true },
            sign: { type: String, required: true },
            color: { type: String, required: true },
            subCategories: {
                name: { type: String, required: true },
                sign: { type: String, required: true },
                color: { type: String, required: true },
            }
        }
    },
    subCategory: {
        type: Object,
        of: {
            name: { type: String, required: true },
            sign: { type: String, required: true },
            color: { type: String, required: true },
        }
    }
})

const storiesSchema = new Schema({
    img: Buffer,
    header: String,
    description: String,
    background: Buffer
})

const Purpose = new mongoose.model('Purpose', purposeSchema)
const Account = new mongoose.model('Card', accountSchema)
const Contribution = new mongoose.model('Contribution', contributionSchema)
const Investment = new mongoose.model('Investment', investmentSchema)
const Debt = new mongoose.model('Debt', debtSchema)
const Transaction = new mongoose.model('Transaction', transactionSchema)
const Category = new mongoose.model('Category', categorySchema)
const Story = new mongoose.model('Story', storiesSchema)


module.exports = {
    schemes: {
    categorySchema,
    accountSchema,
    contributionSchema,
    investmentSchema,
    debtSchema,
    purposeSchema,
    transactionSchema,
    storiesSchema
    },
    models: {
        Purpose,
        Account,
        Contribution,
        Investment,
        Debt,
        Transaction,
        Category,
        Story
    }
}