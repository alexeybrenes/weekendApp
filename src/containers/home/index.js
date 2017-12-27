import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {login} from '../../redux'
import RaisedButton from 'material-ui/RaisedButton';
import { CSSTransitionGroup } from 'react-transition-group'
import { ValidatorForm } from 'react-form-validator-core';
import { TextValidator} from 'react-material-ui-form-validator';
import Snackbar from 'material-ui/Snackbar';
import './home.css';
import * as colors from 'material-ui/styles/colors';

const styles = {
    textField: {
        focusedUnderline: {
            borderBottom: `1px solid ${colors.grey800}`
        },
        floatingLabelFocusStyle: {
            color: colors.grey400
        },
        error: {
            color: colors.blueGrey200
        }
    },
    raisedButton: {
        display: 'block',
        marginTop: '20px'
    }

}

const msg = {
    errorFieldRequired: "This field is required",
    errorEmailNotValid: "Email is not valid"
}

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            password: '',
            snackbarOpen: false
        };
    }

    componentWillReceiveProps(nextProps) {
       if (nextProps.app.error) {
           this.setState({
               snackbarOpen: true
           })
       }
    }

    handleSubmit = () => {
        this.props.login(this.state.user, this.state.password)
    }

    handleTextChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSnackbarRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    render() {

        const {errorMessage} = this.props.app;

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
            <div className='home'>
                <section className='home_inner home_information column'>
                    <h1>WELCOME</h1>
                    <p className='home_information-text'>LET'S DO SOMETHING FUN</p>
                </section>
                <section className='home_inner home_login column'>
                    <div className='home_login_form'>
                        <div className='login_form_container'>
                            <h1>Please Log In</h1>
                            <ValidatorForm
                                name="loginForm"
                                ref="form"
                                onSubmit={this.handleSubmit}
                            >
                                <TextValidator
                                    id="user"
                                    name="user"
                                    value={this.state.user}
                                    hintText="yourname@email.com"
                                    floatingLabelText="Email"
                                    onChange={this.handleTextChange}
                                    underlineFocusStyle={styles.textField.focusedUnderline}
                                    floatingLabelFocusStyle={styles.textField.floatingLabelFocusStyle}
                                    fullWidth={true}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[msg.errorFieldRequired, msg.errorEmailNotValid]}
                                    errorStyle={styles.textField.error}
                                />
                                <br/>
                                <TextValidator
                                    id="password"
                                    name="password"
                                    value={this.state.password}
                                    hintText="Your super secret password"
                                    floatingLabelText="Password"
                                    onChange={this.handleTextChange}
                                    type="password"
                                    validators={['required']}
                                    errorMessages={[msg.errorFieldRequired]}
                                    underlineFocusStyle={styles.textField.focusedUnderline}
                                    floatingLabelFocusStyle={styles.textField.floatingLabelFocusStyle}
                                    fullWidth={true}
                                    errorStyle={styles.textField.error}
                                />
                                <RaisedButton
                                    label="Log In"
                                    type="submit"
                                    primary={true}
                                    style={styles.raisedButton}
                                    buttonStyle={{background: '#151922'}}
                                />
                            </ValidatorForm>
                        </div>

                    </div>
                </section>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={errorMessage || ''}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarRequestClose}
                />
            </div>
            </CSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app
})

const mapDispatchToProps = dispatch => bindActionCreators({
    login
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)