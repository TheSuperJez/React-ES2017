import React, {PropTypes} from 'react';

import QuestionRow from './QuestionTableRow';

const QuestionList = ({questionsList}) => {
	let questions = questionsList.map((element, index) => {
		let propiedades = element.toJSON();
		return (
			<QuestionRow key={index} {...propiedades} />
		);
	});
	return (
		<div>
			LIST
			<table>
			<thead>
				<tr>
					<th>{'#'}</th>
					<th>{'Text'}</th>
					<th>{'Answers Number'}</th>
				</tr>
			</thead>
			<tbody>
				{questions}
			</tbody>
			</table>	
		</div>
	);
};

QuestionList.propTypes = {
	questionsList: PropTypes.array
};

export default QuestionList;
