import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from 'components/Message'
import { login } from "app/userSlice"

import "./Login.scss"

export default function Login({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const { error, userInfo } = useSelector(state => state.user)

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ "username": email, "password": password }));
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="d-flex justify-content-center">Sign In</h1>
                    {error && <Message variant='danger'>Please insert correct email and password!</Message>}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='username'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button className="btn-login mx-auto d-block" type='submit' variant='dark'>
                            Sign In
                        </Button>
                    </Form>

                    <Row>
                        <Col>
                            <span>New Customer?<Link to={'/register'}> Register </Link></span>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

