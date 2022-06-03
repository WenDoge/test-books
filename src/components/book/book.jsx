import './book.css';
import images from '../../images.json';
import Form from '../form/form';
import { useState, useRef } from 'react';

const Book = ({ id, name, author, handleDelete, handleEdit, img }) => {
	images.forEach(({ id, img }) => {
		!localStorage.getItem('book' + id) &&
			localStorage.setItem('book' + id, img);
	});
	const [editToggle, setEditToggle] = useState(false);
	const [inputValues, setInputValues] = useState({ name, author });
	const [style, setStyle] = useState('none');
	const nameRef = useRef(null);
	const authorRef = useRef(null);

	const handleInputChange = type => {
		return function (event) {
			if (type === 'author')
				setInputValues({ ...inputValues, author: event.target.value });
			else if (type === 'name')
				setInputValues({ ...inputValues, name: event.target.value });
			return;
		};
	};

	const disableSubmit = () => {
		if (inputValues.author !== author || inputValues.name !== name) {
			return false;
		}
		return true;
	};

	const handleSubmit = event => {
		event.preventDefault();
		const bookStyle =
			style !== 'none' ? localStorage.getItem('book' + style) : 'none';
		handleEdit(id, event.target[0].value, event.target[1].value, bookStyle);
		setEditToggle(false);
	};

	const handleStyleChange = e => {
		setStyle(e.target.value);
	};
	return (
		<div className="book">
			{img !== 'none' && (
				<img
					alt="img"
					className="book__img"
					src={`data:image/image/png;base64,${img}`}
					width="145"
					height="205"></img>
			)}
			{!editToggle ? (
				<>
					<span className="book__item">{name}</span>
					<span className="book__item">{author}</span>
				</>
			) : (
				<>
					<Form
						handleSubmit={handleSubmit}
						style={style}
						handleStyleChange={handleStyleChange}
						disableSubmit={disableSubmit()}>
						<>
							<input
								className="book__item"
								ref={nameRef}
								type="text"
								value={inputValues.name}
								onChange={handleInputChange('name')}
								required
							/>
							<input
								className="book__item"
								ref={authorRef}
								type="text"
								value={inputValues.author}
								onChange={handleInputChange('author')}
								required
							/>
						</>
					</Form>
				</>
			)}
			<button className="book__delete" onClick={handleDelete}></button>
			<button
				className="book__edit"
				onClick={() => {
					setEditToggle(!editToggle);
				}}></button>
		</div>
	);
};
export default Book;
