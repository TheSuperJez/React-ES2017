import ajaxModule from './ajaxModule';
import {combineReducers} from 'redux';
import movieModule from './movieModule';
import questionModule from './questionModule';
const rootReducer = combineReducers({
	ajaxModule, 
	questionModule,
	movieModule
});

export default rootReducer;
