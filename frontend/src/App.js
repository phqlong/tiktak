import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "components/Header";
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import ProductDetail from "pages/ProductDetail";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import OrderDetail from "pages/OrderDetail";
import Profile from "pages/Profile";



function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path={["/", "/home", "/search"]} component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/product/:id" component={ProductDetail} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order/:id" component={OrderDetail} />
            <Route path="/profile" component={Profile} />

            {/* <Route path="/tutorials/:id" component={Tutorial} /> */}
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
