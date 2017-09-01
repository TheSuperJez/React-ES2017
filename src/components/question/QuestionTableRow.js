import React, {PropTypes} from 'react';
const QuestionTableRow = ({objectId, questionText, answers}) => {
	return (
		<tr>
			<td>
				{objectId}
			</td>
			<td>
				{questionText}
			</td>
			<td>
				{answers.length}
			</td>
		</tr>
	);
};

QuestionTableRow.propTypes = {
	objectId: PropTypes.string.isRequired,
	questionText: PropTypes.string.isRequired,
	answers: PropTypes.array.isRequired
};

export default QuestionTableRow;
