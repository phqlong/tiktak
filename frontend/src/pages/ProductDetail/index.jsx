import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from 'components/Rating'
import Loader from 'components/Loader'
import Message from 'components/Message'
import { getProductDetail, createReview } from "app/productSlice"
import { addToCart } from "app/cartSlice"


function ProductDetail({ match, history }) {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const { product, review, error } = useSelector(state => state.productDetail)
    const userInfo = useSelector(state => state.user.userInfo)

    useEffect(() => {
        if (review) {
            setRating(0)
            setComment('')
        }
        dispatch(getProductDetail(match.params.id))
    }, [dispatch, match, review])

    const addToCartHandler = () => {
        dispatch(addToCart(
            {
                "product": product,
                "qty": qty,
            }
        ))
        history.push(`/cart`)
    }

    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(
            {
                "id": match.params.id,
                "review": {
                    rating,
                    comment
                }
            }
        ))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Back to Home</Link>
            {error ? <Message variant='danger'>{error}</Message>
                : (
                    <div>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>


                            <Col md={6}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h1>{product.name}</h1>

                                        {product.rating ?
                                            (<span>
                                                <Rating rating={product.rating} /> {product.numRatings} reviews - Avg: {product.rating}
                                            </span>)
                                            :
                                            "No review"
                                        }
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Size: {product.size}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Status: {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>


                                <Row className='my-5'>
                                    <Col>
                                        {product.quantity > 0 && (
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(parseInt(e.target.value))}
                                                    >
                                                        {

                                                            [...Array(product.quantity < 5 ? product.quantity : 5).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        )}
                                    </Col>
                                    <Col>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            disabled={product.quantity <= 0}
                                            type='button'>
                                            Add to Cart
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={2}>
                            </Col>
                            <Col md={8}>

                                <h4>All Reviews</h4>
                                {product.reviews?.length === 0 && <Message variant='info'>No Reviews</Message>}

                                <ListGroup variant='flush'>
                                    {product.reviews?.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <h5 style={{ "font-weight": 900 }}>{review.title}</h5>
                                            <Rating rating={review.rating} />
                                            <p>{review.createdAt.substring(0, 10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}

                                    <ListGroup.Item>
                                        <h4>Write a review</h4>
                                        {review && <Message variant='success'>You have reviewed this product!</Message>}

                                        {userInfo ? (
                                            <Form onSubmit={submitReviewHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row='5'
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Button
                                                    type='submit'
                                                    variant='primary'
                                                >
                                                    Submit
                                                </Button>

                                            </Form>
                                        ) : (
                                            <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>
                )
            }
        </div >
    )
}

export default ProductDetail
