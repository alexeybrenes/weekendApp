import React from 'react';
import Dialog from 'material-ui/Dialog';
import ActivityDetailCard from '../activityDetailCard/index';

export default class ActivityDetailModal extends React.Component {
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
                    // title={activity ? activity.name : 'Activity detail'}
                    autoScrollBodyContent={true}
                    open={this.props.show}
                    modal={false}
                    onRequestClose={this.handleClose}
                    bodyStyle={{backgroundColor: '#151922', borderColor: '#151922'}}
                >
                    <ActivityDetailCard
                        activity={activity}
                        closeMainModal={this.handleClose}
                        requestOpenSnackbar={(message) => this.props.requestOpenSnackbar(message)}
                    />
                </Dialog>
            </div>
        )
    }
}