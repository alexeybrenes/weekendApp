import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../home'
import Main from '../main';

const App = () => (
    <div>
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Main} />
        </main>
    </div>
);

export default App;