import React, { PropTypes } from 'react';

import Immutable from 'immutable';

class QuestionForm extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			answersList: new Immutable.List(),
			answerText: '',
			questionText: '',
			showAnswerCapture: false,
			selectedAnswer: 0
		};

		this.addAnswer = this.addAnswer.bind(this);
		this.changeTextQuestion = this.changeTextQuestion.bind(this);
		this.changeTextAnswer = this.changeTextAnswer.bind(this);
		this.closeAnswer = this.closeAnswer.bind(this);
		this.saveAnswer = this.saveAnswer.bind(this);
		this.changeAnswer = this.changeAnswer.bind(this);
		this.saveQuestion = this.saveQuestion.bind(this);
	}

	changeTextQuestion(event) {
		this.setState({
			questionText: event.target.value
		});
	}

	changeTextAnswer(event) {
		this.setState({
			answerText: event.target.value
		});
	}

	addAnswer(event) {
		event.preventDefault();
		this.setState({
			showAnswerCapture: true
		});
	}

	saveAnswer(event) {
		event.preventDefault();
		let newAnser = {},
			answersList = this.state.answersList;
		newAnser.text = this.state.answerText;
		newAnser.checked = true;
		newAnser.nameGroup = 'pregunta';
		answersList = answersList.push(newAnser);
		this.setState({
			showAnswerCapture: false,
			answerText: '',
			answersList
		});
	}

	closeAnswer(event) {
		event.preventDefault();
		this.setState({
			showAnswerCapture: false
		});
	}

	changeAnswer(event) {
		this.setState({
			selectedAnswer: parseInt(event.target.id)
		});
	}

	saveQuestion(event) {
		event.preventDefault();
		let contentPregunta,
			answers = [];

		contentPregunta = {
			questionText: this.state.questionText,
			correctAnswer: 0,
			answers
		};

		this.props.saveQuestion(contentPregunta);

		document.location = '#/question';
	}

	render() {
		return (
			<form onSubmit={this.saveQuestion}>
				Pregunta: 
				<input type="text" onChange={this.changeTextQuestion}
						value={this.state.questionText} />
					<button type="submit" >
						{'Guardar'}
					</button>
			</form>
		);
	}
}

QuestionForm.propTypes = {
	saveQuestion: PropTypes.func
};

export default QuestionForm;
