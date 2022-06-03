import './main.css';

import { useState, useEffect, useRef } from 'react';

import mock from '../../mock.json';
import Book from '../book/book';
import Form from '../form/form';
const Main = () => {
	!localStorage.getItem('testBook') &&
		localStorage.setItem('testBook', JSON.stringify(mock));
	!localStorage.getItem('testBookNextId') &&
		localStorage.setItem('testBookNextId', 5);
	const [nextId, setNextId] = useState(localStorage.getItem('testBookNextId'));
	const [data, setData] = useState(
		JSON.parse(localStorage.getItem('testBook'))
	);
	const [alertToggle, setAlertToggle] = useState(false);
	const [addBookToggle, setAddBookToggle] = useState(false);
	const [style, setStyle] = useState('none');
	const containerRef = useRef(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
	const handleClickOutside = event => {
		if (containerRef.current && !containerRef.current.contains(event.target)) {
			setAddBookToggle(false);
			return;
		}
	};
	const handleDelete = id => {
		const filteredList = data.filter(obj => obj.id !== id);
		setData(filteredList);
		localStorage.setItem('testBook', JSON.stringify(filteredList));
	};
	const handleEdit = (id, name, author, img) => {
		const newData = data.map(obj => {
			if (obj.id === id) {
				obj.author = author;
				obj.name = name;
				obj.img = img;
			}
			return obj;
		});
		setData(newData);
		localStorage.setItem('testBook', JSON.stringify(newData));
		setAlertToggle(!alertToggle);
		setTimeout(() => {
			setAlertToggle(false);
		}, 2000);
	};
	const handleStyleChange = e => {
		setStyle(e.target.value);
	};
	const addBook = event => {
		event.preventDefault();
		const newData = [
			...data,
			{
				id: nextId,
				name: event.target[0].value,
				author: event.target[1].value,
				img: style !== 'none' ? localStorage.getItem('book' + style) : 'none',
			},
		];
		setData(newData);
		localStorage.setItem('testBook', JSON.stringify(newData));
		setNextId(nextId + 1);
		localStorage.setItem('testBookNextId', +nextId + 1);
		setAddBookToggle(!addBookToggle);
	};

	return (
		<main className="main">
			<div className="container">
				<div className="books-wrapper">
					{data.map(({ name, author, id, img }) => {
						return (
							<Book
								key={'book' + id}
								id={id}
								name={name}
								author={author}
								handleDelete={() => handleDelete(id)}
								handleEdit={handleEdit}
								img={img}
							/>
						);
					})}
					{!addBookToggle ? (
						<button
							className="books-wrapper__add"
							onClick={() => setAddBookToggle(!addBookToggle)}></button>
					) : (
						<div className="book" ref={containerRef}>
							<Form
								handleSubmit={addBook}
								style={style}
								handleStyleChange={handleStyleChange}>
								<div className="book__item">
									<label htmlFor="name-add-form">Name</label>
									<input type="text" required name="name-add-form" />
								</div>
								<div className="book__item">
									<label htmlFor="author-add-form">Author</label>
									<input type="text" required name="author-add-form" />
								</div>
							</Form>
						</div>
					)}
				</div>
				{alertToggle ? (
					<div className="notification">
						<span>Изменения успешно сохранены ☑</span>
					</div>
				) : null}
			</div>
		</main>
	);
};
export default Main;
