import React from 'react';
import Dialog from 'material-ui/Dialog';
import ActivityEditList from '../activityEditList';

export default class ActivityEditModal extends React.Component {
    constructor({show}) {
        super();
        this.state = {
            open: show
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.handleVisibility(false);
    };

    render() {
        const {activity} = this.props;
        return(
            <div>
                <Dialog
                    title={activity ? `Editing: ${activity.name}` : 'Activity Edit'}
                    autoScrollBodyContent={true}
                    open={this.props.show}
                    modal={false}
                    onRequestClose={this.handleClose}
                >
                    <ActivityEditList
                        activity={activity}
                        onRequestClose={this.handleClose}
                        requestOpenSnackbar={(message) => this.props.requestOpenSnackbar(message)}
                        closeMainModal={this.props.closeMainModal}
                    />
                </Dialog>
            </div>
        )
    }
}