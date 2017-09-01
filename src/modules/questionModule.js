import {Answer, Question} from './stateDescriptor';
import {ajaxCallError, beginAjaxCall} from './ajaxModule';

import Immutable from 'immutable';
import initialState from './initialState';
import questionApi from '../api/questions';

export const LOAD_QUESTION_LIST_SUCCESS = 'LOAD_QUESTION_LIST_SUCCESS';
export const SAVE_QUESTION_SUCCESS = 'SAVE_QUESTION_SUCCESS';
export const ADD_QUESTION = 'ADD_QUESTION';

export default function reducer(state = initialState.get('questionModule'), action) {
	switch (action.type) {
	case LOAD_QUESTION_LIST_SUCCESS: {
		return state.set('questionsList', action.questionsList);
	}
	case SAVE_QUESTION_SUCCESS: {
		let questionList = state.get('questionList');
		return state.set('questionList', questionList.push(action.questionList[0]));
	}
	default: return state;
	}
}

export const loadQuestions = () => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return questionApi.getAll().then(response => {
			let questionsList = new Immutable.List();
			_.each(response.data.results, (element) => {
				let answersList = new Immutable.List(); 
				let question = new Question(element);

				_.each(element.answers, (elem) => {
					let answer = new Answer(elem);
					answersList = answersList.push(answer);
				});
				questionsList = questionsList.push(question.set('answers', answersList));
			});
			dispatch({type: LOAD_QUESTION_LIST_SUCCESS, questionsList});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw(error);
		});
	};
};

export const saveQuestion = (question) => {
	return (dispatch) => {
		return questionApi.saveQuestion(question).then(response => {
			dispatch({type: SAVE_QUESTION_SUCCESS, result: response.data});
			dispatch(loadQuestions());
		}).catch(error => {
			dispatch(ajaxCallError(error));
			throw (error);
		});
	};
};
