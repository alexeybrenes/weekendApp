import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {login} from '../../redux'
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

    componentDidMount() {}

    handleTextChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {

        const styles = {
            textField: {
                focusedUnderline: {
                    borderBottom: '1px solid #3A3F45'
                },
                floatingLabelFocusStyle: {
                    color: '#BFC0C4'
                }
            },
            raisedButton: {
                display: 'block',
                marginTop: '20px'
            }

        }
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
                            <TextField
                                id="user"
                                hintText="yourname@email.com"
                                floatingLabelText="Username"
                                onChange={this.handleTextChange}
                                underlineFocusStyle={styles.textField.focusedUnderline}
                                floatingLabelFocusStyle={styles.textField.floatingLabelFocusStyle}
                            />
                            <br/>
                            <TextField
                                id="password"
                                hintText="Your super secret password"
                                floatingLabelText="Password"
                                onChange={this.handleTextChange}
                                type="password"
                                underlineFocusStyle={styles.textField.focusedUnderline}
                                floatingLabelFocusStyle={styles.textField.floatingLabelFocusStyle}
                            />
                            <RaisedButton
                                label="Log In"
                                primary={true}
                                onClick={() => this.props.login(this.state.user, this.state.password)}
                                style={styles.raisedButton}
                                buttonStyle={{background: '#151922'}}
                            />
                        </div>

                    </div>
                </section>
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