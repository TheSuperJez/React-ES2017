import * as questionModule from '../../modules/questionModule';

import {expect} from 'chai';
import initialState from '../../modules/initialState';
import reducer from '../../modules/questionModule';

describe('Reducer de questions', () => {
	it('LOAD_QUESTION_LIST_SUCCESS:' +
		' Debe devolver una lista de preguntas.', () => {
		let test = {
			type: questionModule.LOAD_QUESTION_LIST_SUCCESS,
			questionsList: [{text: 'Probando'}]
		};
		let testState = reducer(initialState.questionModule, test);
		expect(testState.get('questionsList')).to.be.an('array');
		expect(testState.get('questionsListt')).not.to.be.a('undefined');
	});
	it('ADD_QUESTION:' +
		' Debe devolver una lista de preguntas, diferente a la enviada.', () => {
		let test = {
			type: questionModule.ADD_QUESTION,
			questionsList: [{text: 'Probando'}]
		};
		let testState = reducer(initialState.questionModule, test);
		expect(testState.get('questionsList')).to.be.an('array');
		expect(testState.get('questionsList'));
		
	});
});
