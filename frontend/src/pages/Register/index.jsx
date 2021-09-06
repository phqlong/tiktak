import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from 'components/Message'
import { register } from "app/userSlice"

import "./Register.scss"


function Register({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const { error, userInfo } = useSelector(state => state.user)

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, message, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("submit")

        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            setMessage(null)
            dispatch(register({ "name": name, "email": email, "password": password }))
        }

    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="d-flex justify-content-center">Sign Up</h1>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>Email has been used!</Message>}
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                required
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button className="btn-register mx-auto d-block" type='submit' variant='primary'>
                            Register
                        </Button>

                    </Form>

                    <Row className='py-3'>
                        <Col>
                            <span>Already have an Account? <Link to={'/login'}> Sign In </Link></span>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
