
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/app'

import './index.css'

const target = document.querySelector('#root');

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider>
                <div>
                    <App />
                </div>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    target
)