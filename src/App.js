import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Routes from './routers';
// import Routers from './routers';
import withTracker from "./withTracker";

import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard/styles/dashboards.min.css";
import './App.scss';



import { createBrowserHistory } from 'history';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore from './config';
import history from './history';
import LoaderUI from './components/common/Loader/Loader';


const App = () => {

  /************ store configration *********/
  const { persistor, store } = configureStore(history);

  {/* <PersistGate loading={<LoaderUI />} persistor={persistor}> */ }

  return (

    <Provider store={store}>
      <PersistGate loading={<LoaderUI />} persistor={persistor}>
        {/* <ConnectedRouter history={history}> */}
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {Routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  })}
                />
              );
            })}
          </div>
        </Router>
        {/* </ConnectedRouter> */}
      </PersistGate>
    </Provider>
  )
}

export default App;