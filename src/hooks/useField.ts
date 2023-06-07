import { ChangeEvent, useCallback, useState } from 'react';

const useField = (id: string, opts?: { required?: boolean }) => {
	const isRequired = opts?.required ?? false;
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);
	const error = !value && isRequired && touched;

	return {
		value,
		props: {
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			isRequired,
			error,
			helperText: error ? 'Required' : ''
		}
	};
};

export default useField;
