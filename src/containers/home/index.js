import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {login} from '../../redux'
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { CSSTransitionGroup } from 'react-transition-group'
import './home.css';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: ''
        };
    }

    componentDidMount() {
        document.body.classList.add('home');
    }

    handleTextChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        const style = {
            height: 300,
            width: 500,
            margin: 'auto',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            textAlign: 'center',
            display: 'inline-block',
        };
        const buttonStyle = {
          margin: 20,
          display: 'block'
        };
        return (
            <CSSTransitionGroup
                transitionName="initial"
                transitionAppear={true}
                transitionAppearTimeout={1000}
                transitionEnter={true}
                transitionEnterTimeout={1000}
                transitionLeave={true}
                transitionLeaveTimeout={1000}
            >
            <div>
                <AppBar title="Activity Calendar" showMenuIconButton={false}/>
                <Paper style={style} zDepth={3}>
                    <AppBar title="Please log in" showMenuIconButton={false}/>
                    <TextField
                        id="user"
                        hintText="yourname@email.com"
                        floatingLabelText="Username"
                        onChange={this.handleTextChange}
                    />
                    <TextField
                        id="password"
                        hintText="Your super secret password"
                        floatingLabelText="Password"
                        onChange={this.handleTextChange}
                        type="password"
                    />
                    <RaisedButton label="Log In" primary={true} style={buttonStyle} onClick={() => this.props.login(this.state.user, this.state.password)}/>
                </Paper>
            </div>
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)