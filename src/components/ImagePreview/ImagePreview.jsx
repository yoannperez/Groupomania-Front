import React from "react";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import './ImagePreview.scss'

//@ts-check
/**
 * Print image file
 * @param {file} image 
 * @example
 * <ImagePreview image={image}/>
 * return (
		<div className='preview'>
			<img className='preview__img' src={preview} alt='' />
		</div>
	);
 */

const ImagePreview = (props) => {
	const {image} = props;
	const [preview, setPreview] = useState("");
	useEffect(() => {
		if (image) {
			console.log(image);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image]);

	return (
		<div className='preview'>
			<img className='preview__img' src={preview} alt='' />
		</div>
	);
};

ImagePreview.propTypes = {
	/**
	 * Image file jpg, png,
	 */
	image: PropTypes.string,
};

export default ImagePreview;
