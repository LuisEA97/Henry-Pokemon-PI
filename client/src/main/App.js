import React from "react";
import Routes from "./Routes.jsx";
import { withRouter } from "react-router-dom";
import NavBar from '../components/navBar/NavBar';

const App = ({ location }) => {
  return (
    <div>
      {location.pathname !== '/' &&  <NavBar />}
      <Routes />
    </div>
  );
}

export default withRouter(App);