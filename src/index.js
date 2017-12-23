
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/app'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './index.css'

const target = document.querySelector('#root');

const muiTheme = getMuiTheme({
    palette: {

    },
    appBar: {
        padding: 20
    },
    textField: {
        hintColor: '#3A3F45',
        floatingLabelColor: '#3A3F45'
    }
});

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider  muiTheme={muiTheme}>
                <div>
                    <App />
                </div>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>,
    target
)