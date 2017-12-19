import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CreateNewForm from '../createNewForm';

export default class CreateNewModal extends React.Component {

    constructor({show}) {
        super();
        this.state = {
            open: show,
            submitDisabled: true
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.handleVisibility(false)
    };

    handleEnableSubmit = (newState) => {
        this.setState({
            submitDisabled: newState
        })
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.submitDisabled}
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <Dialog
                    title="Your very own adventure"
                    actions={actions}
                    modal={true}
                    autoScrollBodyContent={true}
                    open={this.props.show}
                >
                    <CreateNewForm enableSubmit={(newState) => this.handleEnableSubmit(!newState)}/>
                </Dialog>
            </div>
        );
    }
}