import React from 'react'

export const FileInput = ({ input}) => {
	const { value, ...inputProps } = input

	const handleChange = (e) => {
        
		input.onChange(e.target.files[0])
	}

	return (
		<input {...inputProps}  type="file" onChange={handleChange} onBlur={() => {}} />
	)
}