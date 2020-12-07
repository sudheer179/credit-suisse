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

const initialValues = { email: '', password: '' };

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
        .min(8, 'Too Short! Min 8 charactor ')
        .max(12, 'Too Long! Max 12 charactor')
        .required('Password Required'),
});



const Login = () => {

    const [failed, setFailed] = useState(false);
    const style = useStyles();
    const history = useHistory();

    const onSubmit = (values, { setSubmitting }) => {
        const { email, password } = values;
        Axios.post("http://localhost:8080/users/login", { email, password })
            .then(res => {
                setSubmitting(false);
                history.push("/");
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
                validationSchema={loginSchema}
                onSubmit={onSubmit}
            >
                {({ values, touched, isSubmitting, errors, handleChange, handleBlur, handleSubmit }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Card className={style.root}>
                                {isSubmitting && <LinearProgress />}

                                <CardContent>
                                    <Typography className={style.title}>Login</Typography>
                                    <Input className={style.field} name="email" type="email" label="Email" {...{
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
                                </CardContent>
                                {failed && <p className={style.error}>Wrong credentials</p>}
                                <CardActions className={style.actions}>
                                    <Button variant="contained" disabled={isSubmitting} type="submit" color="primary">
                                        Login
                        </Button>
                                    <Button href="/sign-up" color="primary">
                                        New User ?
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