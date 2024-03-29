import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/dashlite.scss";
import "./assets/scss/style-email.scss";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import editCustomerDetails from "./redux/reducers/Reducers";
import AppCard from "./components/mycards/AppCard";

const Error404Modern = lazy(() => import("./pages/error/404-modern"));

const store = createStore(editCustomerDetails);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Suspense fallback={<div />}>
        <Router basename={`/`}>
          <Route
            render={({ location }) =>
              location.state && location.state.is404 ? (
                <Error404Modern />
              ) : (
                <App />
              )
            }
          />
        </Router>
      </Suspense>
      {/* <AppCard /> */}
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
