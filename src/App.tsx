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
import { Auth0Provider } from './react-auth0-spa'

const auth0Domain = process.env.AUTH0_DOMAIN
const auth0ClientId = process.env.AUTH0_CLIENT_ID
const auth0Audience = process.env.AUTH0_AUDIENCE
const auth0RedirectUri = window.location.origin

if (
  auth0Domain === undefined
  || auth0ClientId === undefined
  || auth0Audience === undefined
) {
  throw new Error('missing env vars')
}

const history = createBrowserHistory();
const store = configureStore(history, {});
const token = localStorage.getItem('token');

if (token) {
  axios.defaults.headers.common['Authorization'] = `Authorization ${token}`;
} else {
  axios.defaults.headers.common['Authorization'] = null;
}
axios.interceptors.response.use((response) => response.data)

const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
  console.log(
    'auth0 onRedirectCallback called with redirectState %o',
    redirectResult
  )

  // Clears auth0 query string parameters from url
  const targetUrl = redirectResult
  && redirectResult.appState
  && redirectResult.appState.targetUrl
    ? redirectResult.appState.targetUrl
    : window.location.pathname

  history.push(targetUrl)
}

const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      audience={auth0Audience}
      onRedirectCallback={onAuthRedirectCallback}
    >
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route component={Home} path={'/Home'}/>
            <Route component={General} path={'/General'}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    </Auth0Provider>
  );
}

export default App
