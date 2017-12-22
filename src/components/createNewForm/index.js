import React from 'react';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {combineDateTime} from '../../utils';
import {getActiveUser} from '../../redux';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createActivity} from '../../redux';

class CreateNewForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,
            activity: {
                name: '',
                recommendation_reason: '',
                category: '',
                description: '',
                date: '',
                time: '',
                imageUrl: ''
            }
        }
    }

    dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
            this.asyncTimer = setTimeout(cb, 500);
        });
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 3,
            }));
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                finished: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    disableWeekDays(date) {
        return date.getDay() > 0 && date.getDay() < 6;
    }

    handleTextChange = (event) => {
        this.setState({
            activity: {
                ...this.state.activity,
                [event.target.id]: event.target.value
            }
        });
    }

    handleDateChange = (event, value) => {
        this.setState({
            activity: {
                ...this.state.activity,
                date: value
            }
        })
    }

    handleTimeChange = (event, value) => {
        this.setState({
            activity: {
                ...this.state.activity,
                time: value
            }
        })
    }

    handleImageChange = (event) => {
        this.setState({
            activity: {
                ...this.state.activity,
                imageFile: event.target.files[0]
            }
        })
    }

    handleSubmit= () => {
        const {activity} = this.state;
        const date = combineDateTime(activity.date, activity.time);
        this.props.createActivity(activity, date);
        this.props.onRequestClose();
        this.props.requestOpenSnackbar('Activity Created');

    }

    getStepContent(stepIndex) {
        const inputStyle = {
            margin: 0,
            display: 'block'
        }
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <TextField
                            id='name'
                            style={inputStyle}
                            floatingLabelText="What is the title of your activity?"
                            fullWidth={true}
                            onChange={this.handleTextChange}
                        />
                        <br/>
                        <TextField
                            id='recommendation_reason'
                            style={inputStyle}
                            floatingLabelText="What would you recommend it?"
                            fullWidth={true}
                            onChange={this.handleTextChange}
                        />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TextField
                            id='category'
                            style={inputStyle}
                            floatingLabelText="What category would you say it is?"
                            hintText="Movies, Hiking, Boating, etc"
                            fullWidth={true}
                            onChange={this.handleTextChange}
                        />
                        <TextField
                            id='description'
                            style={inputStyle}
                            floatingLabelText="Short description please?"
                            multiLine={true}
                            rows={4}
                            fullWidth={true}
                            onChange={this.handleTextChange}
                        />
                    </div>
                );
            case 2:
                const today = new Date();
                return (
                    <div>
                       <DatePicker
                           id='date'
                           shouldDisableDate={this.disableWeekDays}
                           minDate={today}
                           hintText="Let's decide on a date..."
                           onChange={this.handleDateChange}
                       />
                        <br/>
                        <TimePicker
                            id='time'
                            format="24hr"
                            hintText="... and time"
                            onChange={this.handleTimeChange}
                        />
                    </div>
                );
            case 3:
                return(
                    <TextField
                        id='imageUrl'
                        style={inputStyle}
                        floatingLabelText="Add an image url"
                        hintText="http://image.jpg"
                        fullWidth={true}
                        onChange={this.handleTextChange}
                    />
                );
            default:
                return 'Something went wrong...';
        }
    }

    renderContent() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px', overflow: 'hidden'};

        if (finished) {
            return (
                <div style={contentStyle}>
                    <p>Great!</p>
                    <p>You can now either <strong>review and edit</strong>, <strong>submit</strong> or <strong>cancel</strong> your activity.</p>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label='Submit'
                        primary={true}
                        onClick={this.handleSubmit}
                    />
                </div>
            );
        }

        return (
            <div style={contentStyle}>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 24, marginBottom: 12}}>
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                    />
                    <RaisedButton
                        label={stepIndex === 3 ? 'Finish' : 'Next'}
                        primary={true}
                        onClick={this.handleNext}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {loading, stepIndex} = this.state;

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                <Stepper activeStep={stepIndex}>
                    <Step>
                        <StepLabel>Title and Recommendation</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Category and Description</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Date and Time</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Image</StepLabel>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getActiveUser,
    createActivity
}, dispatch)

const mapStateToProps = state => ({
    activeUser: getActiveUser(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNewForm)