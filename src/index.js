import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './styles/index.scss';
import routes from './routes';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

const Root = () => {
    return (
        <Router>
            <React.Fragment>
                {
                    routes.map((route, index) => <Route {...route} key={index} />)
                }
            </React.Fragment>
        </Router>
    );
};


ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('app')
);