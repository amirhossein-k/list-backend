const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const ConnetDb = require('./config/db')
const ListRouter = require('./routes/ListRouter')
const UploadeRouter = require('./routes/uploadeRouter')


const app = express()

dotenv.config()
const port = process.env.PORT || 3000
app.use(cors({
    origin:"*"
}))

app.use(express.json())

ConnetDb()
app.listen(port, ()=>{ console.log(`App Listening on PORT ${port}`)})


app.use('/api/list',ListRouter)
app.use('/api/uploade',UploadeRouter)

