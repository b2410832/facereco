import React from 'react';
import './ImageLinkForm.css';
 

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div className='ma3'>
			<p className='wordstyle f3 center'>
				{'This Magic Facereco will detect faces in your pictures. Give it a Try!'}
			</p>
			<div>
				<div className='pa4 form center'>
					<input 
						type='text' 
						className='pa2 f4 w-70' 
						placeholder='Please enter your URL.'
						onChange={onInputChange} />
					<button 
						className='cursor f3 no-underline white bg-black bg-animate hover-bg-white hover-black pa3 ba border-box' 
						onClick={onButtonSubmit}
					>
					Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;