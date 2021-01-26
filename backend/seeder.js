import mongoose from 'mongoose'
import dotenv from 'dotenv'
// import productsl from './data/productlist.js'
import users from './data/users.js'
import User from './models/userModel.js'
// import Product from './models/productModel.js'
import Event from './models/eventModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import events from './data/eventlist.js'

dotenv.config()

connectDB()

// const importData = async () => {
//     try {
//         await Product.deleteMany()
//         await User.deleteMany()
//         await Order.deleteMany()

//         const createdUsers = await User.insertMany(users)

//         const adminUser = createdUsers[0]._id

//         const sampleProducts = productsl.map(product => {
//             return { ...product, user: adminUser }
//         })

//         await Product.insertMany(sampleProducts)
//         console.log('Data Imported!!!')
//         process.exit()
//     } catch (error) {
//         console.error(`${error}`)
//         process.exit(1)
//     }
// }

// const destroyData = async () => {
//     try {
//         await Product.deleteMany()
//         await User.deleteMany()
//         await Order.deleteMany()

//         console.log('Data Destroyed!!!')
//         process.exit()
//     } catch (error) {
//         console.error(`${error}`)
//         process.exit(1)
//     }
// }



const importData = async () => {
    try {
        await Event.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)

        const adminUser = createdUsers[0]._id

        const sampleEvents = events.map(event => {
            return { ...event, user: adminUser }
        })

        await Event.insertMany(sampleEvents)
        console.log('Data Imported!!!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Event.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        console.log('Data Destroyed!!!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

(process.argv[2]==='-d')? destroyData() : importData()

