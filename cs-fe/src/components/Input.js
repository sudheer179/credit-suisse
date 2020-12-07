import React from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({ type, name, label, className, touched, errors, handleChange, handleBlur, values }) => {
    return (
        <TextField
            id={name}
            type={type}
            name={name}
            label={label}
            className={className}
            helperText={touched[name] ? errors[name] : ""}
            error={touched[name] && Boolean(errors[name])}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
        />
    );
}

export default Input;