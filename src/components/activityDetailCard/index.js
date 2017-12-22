import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {deleteActivity} from '../../redux';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ActivityEditModal from '../activityEditModal';


class ActivityDetailCard extends React.Component {

    constructor(){
        super();
        this.state = {
            deleteAlertOpen: false,
            showActivityEditModal: false
        }
    }

    showActivityEditModal = (newState, activity) => {
        this.setState({
            showActivityEditModal: newState,
            activity
        })
    }

    handleDeleteAlertOpen = () => {
        this.setState({deleteAlertOpen: true});
    };

    handleDeleteAlertClose = () => {
        this.setState({deleteAlertOpen: false});
    };

    deleteActivity = (objectId) => {
        this.props.deleteActivity(objectId);
        this.handleDeleteAlertClose();
        this.props.closeMainModal();
        this.props.requestOpenSnackbar('Activity Removed');
    }

    render() {
        const {activity} = this.props;
        const deleteAlertActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDeleteAlertClose}
            />,
            <FlatButton
                label="Delete"
                primary={true}
                onClick={() => this.deleteActivity(activity.objectId)}
            />,
        ];
        return (
            <div>
                <Card>
                    <CardHeader
                        title={`Submitted by: ${activity.ownerId ? activity.ownerId : 'Magic'}`}
                    />
                    <CardMedia
                        overlay={
                            <CardTitle
                                title={new Date(activity.nextPossibleDate).toDateString()}
                                subtitle={new Date(activity.nextPossibleDate).toTimeString()}
                            />
                        }
                    >
                        <img src={activity.imageUrl} alt="" />
                    </CardMedia>
                    <CardTitle title={activity.recommendation_reason} subtitle={`Category: ${activity.category}`} />
                    <CardText>
                        {activity.description}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Edit" onClick={() => {this.showActivityEditModal(true, activity)}}/>
                        <FlatButton label="Delete" backgroundColor='#ffcdd2' onClick={this.handleDeleteAlertOpen} />
                    </CardActions>
                </Card>

                <Dialog
                    actions={deleteAlertActions}
                    modal={false}
                    open={this.state.deleteAlertOpen}
                    onRequestClose={this.handleDeleteAlertClose}
                >
                    Delete this activity?
                </Dialog>
                <ActivityEditModal
                    show={this.state.showActivityEditModal}
                    handleVisibility={(newState) => this.showActivityEditModal(newState)}
                    activity={this.state.activity}
                    requestOpenSnackbar={(message) => this.props.requestOpenSnackbar(message)}
                    closeMainModal={this.props.closeMainModal}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
    deleteActivity
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivityDetailCard)