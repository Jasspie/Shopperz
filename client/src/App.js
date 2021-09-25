import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  document.body.style = "background: #FFE9DB;";
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
