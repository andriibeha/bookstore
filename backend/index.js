import express from 'express'
import mongoose from 'mongoose'
import { MONGODBURL, PORT } from './config.js'
import { Book } from './modules/bookModule.js'

const app = express()

app.get('/', (req, res) => {
	return res.status(234).send('Welcom')
})

app.use(express.json())

//Routes POST Book
app.post('/books', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({
				message: 'Send all required fields: title, author, publishYear',
			})
		}

		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		}

		const book = await Book.create(newBook)

		return res.status(201).send(book)
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

//Routes GET all Books
app.get('/books', async (req, res) => {
	try {
		const books = await Book.find({})
		console.log(typeof books)

		return res.status(200).json({
			count: books.length,
			data: books,
		})
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

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
