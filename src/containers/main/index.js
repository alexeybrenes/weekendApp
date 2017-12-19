import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewModal from '../../components/createNewModal';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import data from '../../data';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateNewModal: false,
            gridData: []
        }
    }

    componentDidMount() {
        this.fetchGridData();
    }

    fetchGridData() {
        axios.get(`${data.URL}/${data.APP_ID}/${data.API_KEY}/data/activities`)
            .then(response => {
                this.setState({gridData: response.data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onCreateNewModalChanged = (newState) => {
        this.setState({
            showCreateNewModal: newState
        })
    }

    render() {
        const {gridData} = this.state;
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto',
            },
            paper: {
                margin: 10
            }
        };
        const data = [];
        return (
            <div style={{'textAlign': 'center'}}>
                <AppBar title="Activity Calendar" showMenuIconButton={false}/>
                <Paper zDepth={1} style={styles.paper}>
                    <AutoComplete
                        floatingLabelText="Search for something exciting"
                        dataSource={data}
                        fullWidth={true}
                    />
                </Paper>
                <p> - OR - </p>
                <Paper zDepth={1} style={styles.paper}>
                    <RaisedButton
                        label="Create your own"
                        primary={true}
                        onClick={() => this.onCreateNewModalChanged(true)}
                    />
                </Paper>
                <Paper zDepth={1} style={styles.paper}>
                    <Subheader>Featured appointments</Subheader>
                    <div className="grid" style={styles.root}>
                        <GridList
                            cellHeight={180}
                            style={styles.gridList}
                        >
                            {gridData.map((tile) => (
                                <GridTile
                                    key={tile.name}
                                    title={tile.name}

                                >
                                    <img src={tile.imageUrl} alt={tile.name} />
                                </GridTile>
                            ))}
                        </GridList>
                    </div>
                </Paper>
                <CreateNewModal show={this.state.showCreateNewModal} handleVisibility={(newState) => this.onCreateNewModalChanged(newState)}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    //createNewAppointment
}, dispatch)

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)