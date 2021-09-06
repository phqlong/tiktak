import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import { fetchProductList } from "app/productSlice"

import "./Home.scss";
import Pagination from "components/Pagination";
import { useLocation } from "react-router-dom";
import Rating from "components/Rating";


export default function Home() {
	const dispatch = useDispatch();

	const searchParams = new URLSearchParams(useLocation().search)
	const searchKeyword = searchParams.get("keyword")

	const { products, page, pages } = useSelector(state => state.productList);
	const [filters, setFilters] = useState({
		limit: 4,
		page: page,
		keyword: "",
	});

	useEffect(() => {
		if (filters.keyword !== searchKeyword) {
			setFilters({ ...filters, keyword: searchKeyword, page: 1 });
		}
	}, [searchKeyword]);

	useEffect(() => {
		dispatch(fetchProductList(filters))
	}, [filters, dispatch]);

	function handlePageChange(newPage) {
		setFilters({ ...filters, page: newPage });
	}

	return (
		<Container>
			<h4>All Products</h4>

			<Row className="home__row">
				{products.map((product, index) => (
					<Col key={index + 1} >
						<Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
							<Card className="product">
								<CardImg src={product.image} top width="100%" alt="Card Image" className="product__image" />

								<CardBody>
									<CardTitle className="product__rating">
										<Rating rating={product.rating} /> {product.numRatings} reviews
									</CardTitle>

									<CardTitle className="product__title"><h5>{product.name}</h5></CardTitle>
									<CardText className="product__price">{product.price}<span> <small>$</small></span></CardText>
								</CardBody>
							</Card>
						</Link>
					</Col>))}
			</Row>

			<div className="home__pagination">
				<Pagination
					page={page}
					pages={pages}
					onPageChange={handlePageChange}
				/>
			</div>


		</Container>
	);
}
