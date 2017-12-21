import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CreateNewForm from '../createNewForm';

export default class CreateNewModal extends React.Component {

    constructor({show}) {
        super();
        this.state = {
            open: show
        }
    }

    handleClose = () => {
        this.setState({open: false});
        this.props.handleVisibility(false)
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />
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
                    <CreateNewForm/>
                </Dialog>
            </div>
        );
    }
}