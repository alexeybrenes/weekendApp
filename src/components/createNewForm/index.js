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

/**
 * A contrived example using a transition between steps
 */
class CreateNewForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            finished: false,
            stepIndex: 0,
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
            if (stepIndex === 2) {
                this.props.enableSubmit(true);
            }
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
            }));
        }


    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
            this.dummyAsync(() => this.setState({
                loading: false,
                stepIndex: stepIndex - 1,
            }));
        }
    };

    disableWeekDays(date) {
        return date.getDay() > 0 && date.getDay() < 6;
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
                            style={inputStyle}
                            floatingLabelText="What is the title of your adventure?"
                            fullWidth={true}
                        />
                        <br/>
                        <TextField
                            style={inputStyle}
                            floatingLabelText="What category would you say it is?"
                            hintText="Movies, Hiking, Climbing, Boating, etc"
                            fullWidth={true}
                        />
                    </div>
                );
            case 1:
                return (
                    <div>
                        <TextField
                            style={inputStyle}
                            floatingLabelText="Why would you like to go there?"
                            multiLine={true}
                            rows={4}
                            fullWidth={true}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                       <DatePicker
                           shouldDisableDate={this.disableWeekDays}
                           hintText="Let's decide on a date..."
                       />
                        <br/>
                        <TimePicker
                            format="24hr"
                            hintText="... and time"
                        />
                    </div>
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
                    <p>You can now either <strong>submit</strong> or <strong>cancel</strong> your adventure.</p>
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
                        label={stepIndex === 2 ? 'Finish' : 'Next'}
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
                        <StepLabel>Title and Category</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Description</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Date and Time</StepLabel>
                    </Step>
                </Stepper>
                <ExpandTransition loading={loading} open={true}>
                    {this.renderContent()}
                </ExpandTransition>
            </div>
        );
    }
}

export default CreateNewForm;