import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Card, makeStyles, CardContent, Typography, CardActions, Button, LinearProgress, Container } from '@material-ui/core';
import Input from '../components/Input';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        textAlign: 'center',
        marginTop: 100,
    },
    title: {
        fontSize: 24,
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    field: {
        height: 70,
    },
    error: {
        color: 'red',
    }
});

const initialValues = { name: '', email: '', password: '', mobileNo: '', };

const signupSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    email: Yup.string().email('Invalid email').required('Email Required'),
    mobile: Yup.string().required('Mobile No Required'),
    password: Yup.string()
        .min(8, 'Too Short! Min 8 charactor ')
        .max(12, 'Too Long! Max 12 charactor')
        .required('Password Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});



const Login = () => {

    const [failed, setFailed] = useState(false);
    const style = useStyles();
    const history = useHistory();

    const onSubmit = (values, { setSubmitting }) => {
        const { email, password, mobile, name } = values;
        Axios.post("http://localhost:8080/users/", { email, password, mobile, name })
            .then(res => {
                setSubmitting(false);
                history.push("/login");
            })
            .catch(error => {
                setFailed(true);
                setTimeout(() => setFailed(false), 5000);
                setSubmitting(false);
            });
    }

    return (
        <Container maxWidth="xs">
            <Formik
                initialValues={initialValues}
                validationSchema={signupSchema}
                onSubmit={onSubmit}
            >
                {({ values, touched, isSubmitting, errors, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Card className={style.root}>
                                {isSubmitting && <LinearProgress />}

                                <CardContent>
                                    <Typography className={style.title}>Sign up</Typography>
                                    <Input className={style.field} name="name" type="text" label="Name" {...{
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur
                                    }}
                                    />
                                    <Input className={style.field} name="email" type="email" label="Email" {...{
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur
                                    }}
                                    />
                                    <Input className={style.field} name="mobile" type="number" label="Mobile No" {...{
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur
                                    }}
                                    />
                                    <Input className={style.field} name="password" type="password" label="Password" {...{
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur
                                    }} />
                                    <Input className={style.field} name="confirmPassword" type="password" label="Confirm Password" {...{
                                        errors,
                                        touched,
                                        values,
                                        handleChange,
                                        handleBlur
                                    }} />
                                </CardContent>
                                {failed && <p className={style.error}>Failed to Register</p>}
                                <CardActions className={style.actions}>
                                    <Button variant="contained" disabled={isSubmitting} type="submit" color="primary">
                                        Register
                                </Button>
                                    <Button href="/login" color="primary">
                                        Already User ?
                                </Button>
                                </CardActions>
                            </Card>
                        </form>
                    );
                }}
            </Formik>
        </Container>
    );
}

export default Login;