/*
 * @file: configureStore.dev.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @author: Jasdeep Singh
 * */

import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "../context/reducers";
import { routerMiddleware } from "connected-react-router";

export default (history) => {
  const store = createStore(
    reducers,
    composeWithDevTools(
      // applyMiddleware(logger, thunk, routerMiddleware(history))
      applyMiddleware(thunk, routerMiddleware(history))
    )
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
