import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import products from './data/productlist.js'
import connectDB from './config/db.js'
// import productRoutes from './routes/productRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req,res)=>{
    res.send("<h1>All good....</h1>")
})

// app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.use('/api/events',eventRoutes)


app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((req, res, next) => {
    const error = new Error('Not Found = ${req.originalUrl}')
    res.status(404)
    next(error)
})

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200? 500 :res.statusCode
    res.status(statusCode)
    res.json({
        message : err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack,
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)) 