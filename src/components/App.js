import { Link, Route, Switch } from 'react-router-dom';
import React, { PropTypes } from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import AppBar from 'material-ui/AppBar';
import Dots from './common/Dots';
import DropDownMenu from 'material-ui/DropDownMenu';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { LeftNav } from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import MovieContainer from '../containers/MovieContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import QuestionContainer from '../containers/QuestionContainer';
import QuestionForm from './question/QuestionForm';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { loadQuestions } from '../modules/questionModule';
import moment from 'moment';
import { withRouter } from 'react-router';

class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			menuIsOpened: false,
			value: 3
		};
		this.openMenu = this.openMenu.bind(this);
		this.synchMenu = this.synchMenu.bind(this);
	}

	componentDidMount() {

	}

	openMenu() {
		this.setState({ menuIsOpened: true });
	}

	synchMenu(e) {
		this.setState({ menuIsOpened: e.isOpen });
	}
	
	render() {
		let fecha = moment().format('LT');
		return (
			<div>
				<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
					<div className="container-full" style={{ backgroundColor: '#FFFFFF' }}>
						<div className="row">
							<div className="col-13">
								<AppBar
									title={"App de prueba - " + fecha}
									iconClassNameRight="muidocs-icon-navigation-home"
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<Link to={`/question`}><span style={{marginRight: '1rem'}}>List questions</span></Link>
								<Link to={`/question/new`}><span style={{marginRight: '1rem'}}>New question</span></Link>
								<Link to={`/movie`}><span style={{marginRight: '1rem'}}>Movie</span></Link>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<Switch>
									<Route exact path="/" component={QuestionContainer}></Route>
									<Route path="/question" component={QuestionContainer}></Route>
									<Route path="/movie" component={MovieContainer}></Route>
									<Route render={props => <div>{'Invalid Path'}</div>}></Route>
								</Switch>

							</div>
						</div>
					</div>


				</MuiThemeProvider>

			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object,
	loading: PropTypes.bool,
	questionList: PropTypes.object,
	loadQuestions: PropTypes.func
};

function mapStateToProps(state) {
	return {
		loading: state.ajaxModule > 0,
		questionList: state.questionModule.get('questionList')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loadQuestions: () => dispatch(loadQuestions())
	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
