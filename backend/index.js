import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { MONGODBURL, PORT } from './config.js'
import booksRoute from './routes/booksRoutes.js'

const app = express()

//Parsing Middelware
app.use(express.json())

//CORS Middelware
app.use(cors())

app.get('/', (req, res) => {
	return res.status(234).send('Welcom')
})

app.use('/books', booksRoute)

mongoose
	.connect(MONGODBURL)
	.then(() => {
		console.log('Server Connetced to database')

		app.listen(PORT, () => {
			console.log(`Server start on port: ${PORT}`)
		})
	})
	.catch(error => {
		console.log(error)
	})
