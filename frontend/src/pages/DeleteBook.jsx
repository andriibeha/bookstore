import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spiner from '../components/Spiner'

const DeleteBook = () => {
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const { id } = useParams()

	const handleDeleteBook = () => {
		setLoading(true)

		axios
			.delete(`http://localhost:5555/books/${id}`)
			.then(() => {
				setLoading(false)
				navigate('/')
			})
			.catch(error => {
				console.log(error)
				setLoading(false)
			})
	}

	return (
		<div className='py-4'>
			<BackButton />
			<h1 className='text-3xl my-4'>Delete Book</h1>

			{loading ? <Spiner /> : ''}

			<div className='flex flex-col border-2 vorder-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
				<h3 className='text-2xl'>Delete the book?</h3>

				<button
					className='p-4 bg-red-600 text-white m-8 '
					onClick={handleDeleteBook}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default DeleteBook
