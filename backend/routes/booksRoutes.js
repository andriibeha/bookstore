import express from 'express'
import { Book } from '../modules/bookModule.js'

const router = express.Router()

//Routes POST Book
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
	try {
		const books = await Book.find({})

		return res.status(200).json({
			count: books.length,
			data: books,
		})
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

//Routes GET one Book
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const book = await Book.findById(id)

		if (!book) {
			return res.status(404).json({ message: 'Book not found' })
		}

		return res.status(200).json(book)
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

//Routes PUT one Book
router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params

		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res.status(400).send({
				message: 'Send all required fields: title, author, publishYear',
			})
		}

		const updateData = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		}

		const result = await Book.findByIdAndUpdate(id, updateData, { new: true })

		if (!result) {
			return res.status(404).json({ message: 'Book not found' })
		}

		return res
			.status(200)
			.send({ message: 'Book updated', updatedBook: result })
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

//Routes DELETE one Book
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const book = await Book.findByIdAndDelete(id)

		if (!book) {
			return res.status(404).json({ message: 'Book not found' })
		}

		return res.status(200).send({ message: 'Book deleted' })
	} catch (error) {
		console.log(error.message)
		res.status(500).send({ message: error.message })
	}
})

export default router
