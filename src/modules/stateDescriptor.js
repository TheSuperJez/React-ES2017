import Immutable from 'immutable';

export const Question = new Immutable.Record({
	objectId: undefined,
	questionText: '',
	answers: new Immutable.List(),
	correctAnswer: undefined,
	createdAt: new Date()
});

export const Answer = new Immutable.Record({
	id: undefined,
	text: ''
});

export const Candidate = new Immutable.Record({
	objectId: undefined, 
	nombre: '',
	apePaterno: '',
	apeMaterno: '',
	fechaNacimiento: '' 
});
