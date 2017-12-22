import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {combineDateTime} from "../../utils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {updateActivity} from '../../redux';


class ActivityEditList extends React.Component {

    constructor(props) {
        super(props);
        const {activity} = props;
        activity.date = new Date(activity.nextPossibleDate);
        activity.time = new Date(activity.nextPossibleDate);
        this.state = {
            activity
        }
    }

    handleTextChange = (event) => {
        this.setState({
            activity: {
                ...this.state.activity,
                [event.target.id]: event.target.value
            }
        });
    }

    disableWeekDays(date) {
        return date.getDay() > 0 && date.getDay() < 6;
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

    handleSubmit= () => {
        const {activity} = this.state;
        const date = combineDateTime(activity.date, activity.time);
        this.props.updateActivity(activity, date, activity.objectId);
        this.props.onRequestClose();
        this.props.closeMainModal();
        this.props.requestOpenSnackbar('Activity Edited');
    }

    render() {
        const today = new Date();
        const inputStyle = {
            margin: 0,
            display: 'block'
        }
        return(
            <List>
                <ListItem>
                    <TextField
                        id='name'
                        style={inputStyle}
                        fullWidth={true}
                        value={this.state.activity.name}
                        floatingLabelText="What is the title of your activity?"
                        onChange={this.handleTextChange}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id='recommendation_reason'
                        style={inputStyle}
                        floatingLabelText="What would you recommend it?"
                        fullWidth={true}
                        onChange={this.handleTextChange}
                        value={this.state.activity.recommendation_reason}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id='category'
                        style={inputStyle}
                        floatingLabelText="What category would you say it is?"
                        hintText="Movies, Hiking, Boating, etc"
                        fullWidth={true}
                        onChange={this.handleTextChange}
                        value={this.state.activity.category}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id='description'
                        style={inputStyle}
                        floatingLabelText="Short description please?"
                        multiLine={true}
                        rows={4}
                        fullWidth={true}
                        onChange={this.handleTextChange}
                        value={this.state.activity.description}
                    />
                </ListItem>
                <ListItem>
                    <DatePicker
                        id='date'
                        shouldDisableDate={this.disableWeekDays}
                        minDate={today}
                        hintText="Let's decide on a date..."
                        onChange={this.handleDateChange}
                        value={this.state.activity.date}
                    />
                </ListItem>
                <ListItem>
                    <TimePicker
                        id='time'
                        format="24hr"
                        hintText="... and time"
                        onChange={this.handleTimeChange}
                        value={this.state.activity.time}
                    />
                </ListItem>
                <ListItem>
                    <TextField
                        id='imageUrl'
                        style={inputStyle}
                        floatingLabelText="Image Url"
                        fullWidth={true}
                        onChange={this.handleTextChange}
                        value={this.state.activity.imageUrl}
                    />
                </ListItem>
                <FlatButton
                    label="Cancel"
                    style={{marginRight: 12}}
                    onClick={this.props.onRequestClose}
                />
                <RaisedButton
                    label='Submit'
                    primary={true}
                    onClick={this.handleSubmit}
                />
            </List>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    updateActivity
}, dispatch)

const mapStateToProps = state => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityEditList)