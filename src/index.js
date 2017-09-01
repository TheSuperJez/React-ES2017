import '../sass/main.scss';

import App from './components/App';
import { HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import React from 'react';
import _ from 'underscore';
import configureStore from './store';
import { render } from 'react-dom';

window._ = _;

const store = configureStore();

render(
	<Provider store={store}>
		 <HashRouter>
		 	<App />
		 </HashRouter>
	</Provider>,
	document.getElementById('app')
);
