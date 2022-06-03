const Form = ({
	handleSubmit,
	style,
	handleStyleChange,
	disableSubmit,
	children,
}) => {
	return (
		<form className="book-form" onSubmit={handleSubmit}>
			{style !== 'none' && (
				<img
					alt="img"
					className="book__img"
					src={`data:image/image/png;base64,${localStorage.getItem(
						'book' + style
					)}`}
					width="145"
					height="205"></img>
			)}
			{children}
			<div className="radio">
				<input
					type="radio"
					value="0"
					checked={style === '0'}
					onChange={handleStyleChange}
				/>
				<input
					type="radio"
					value="1"
					checked={style === '1'}
					onChange={handleStyleChange}
				/>
				<input
					type="radio"
					value="2"
					checked={style === '2'}
					onChange={handleStyleChange}
				/>
				<input
					type="radio"
					value="none"
					checked={style === 'none'}
					onChange={handleStyleChange}
				/>
			</div>
			<button
				type="submit"
				className="book__item"
				disabled={disableSubmit ? disableSubmit : false}>
				Submit
			</button>
		</form>
	);
};
export default Form;
