import React from 'react'
import {Provider} from 'react-redux'
import { ConnectedRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import {Route, Switch} from "react-router"
import axios from 'axios'
import './App.css'
import {configureStore} from "./store/store"
import {Home} from './Home'
import {General} from "./General"

const history = createBrowserHistory();
const store = configureStore(history, {});
const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Authorization ${token}`;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}
axios.interceptors.response.use((response) => response.data)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route component={Home} path={'/Home'}/>
          <Route component={General} path={'/General'}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App