import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewModal from '../../components/createNewModal';
import ActivityDetailModal from '../../components/activityDetailModal';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Search from 'material-ui/svg-icons/action/search';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import {getActiveUser, fetchActivityData, getGridData} from '../../redux';
import FlatButton from 'material-ui/FlatButton';
import {push} from "react-router-redux";
import {GridList, GridTile} from 'material-ui/GridList';
import ZoomOutMap from 'material-ui/svg-icons/maps/zoom-out-map';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {CSSTransitionGroup} from 'react-transition-group'
import './main.css';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateNewModal: false,
            showActivityDetailModal: false,
            gridData: [],
            filteredGridData: [],
            greeting: '',
            searchTerm: '',
            activity: null,
            showSnackBar: false,
            snackbarMessage: ''
        }
        this.props.fetchActivityData();
    }

    onUnload() {
        push('/')
    }

    generateRandomGreeting() {
        const greetingPool = [
            "What would you like to do today",
            "What's on your mind today",
            "Where would you like to go"
        ];
        const x = Math.floor(Math.random() * greetingPool.length);
        this.setState({greeting: greetingPool[x]})
    }

    componentDidMount() {
        document.body.classList.add('main');
        this.generateRandomGreeting();

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            gridData: nextProps.gridData,
            filteredGridData: nextProps.gridData
        })
    }

    onCreateNewModalChanged = (newState) => {
        this.setState({
            showCreateNewModal: newState
        })
    }

    showActivityDetailModal = (newState, activity) => {
        this.setState({
            showActivityDetailModal: newState,
            activity
        })
    }

    handleUpdateSearch = (value) => {
        const {gridData} = this.state;
        let filteredData = gridData.filter((tile) => {
            return tile.name.toLowerCase().includes(value.toLowerCase());
        })
        this.setState({
            searchTerm: value,
            filteredGridData: filteredData
        })
    }

    handleRequestCloseSnackBar = () => {
        this.setState({showSnackBar: false})
    }

    handleRequestOpenSnackbar = (message) => {
        this.setState({
            snackbarMessage: message,
            showSnackBar: true
        })
    }

    render() {
        const {gridData, greeting, filteredGridData} = this.state;
        if (!gridData) {
            // return <CircularProgress size={80} thickness={5} />;
            return <span/>
        }
        const {activeUser} = this.props;
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
            },
            gridList: {
                overflowY: 'auto',
                padding: 20,
                margin: 0,
                width: '100%'
            },
            gridTile: {
                border: '1px solid #37474F',
                borderRadius: 3,
                boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.25)',
                background: '#263238'
            },
            card: {
                width: 500,
                height: 450
            },
            paper: {
                margin: 10
            }
        };

        const autocompleteData = gridData.map((tile) => {
            return tile.name;
        });

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
                <div>
                    <section className='main-left'>
                        <div style={styles.root}>

                            <GridList
                                cols={3}
                                cellHeight={180}
                                style={styles.gridList}
                                padding={5}
                                className="gridList"
                            >
                                {filteredGridData.map((tile) => (
                                    <GridTile
                                        className='gridTile'
                                        style={styles.gridTile}
                                        key={tile.objectId}
                                        title={tile.name}
                                        subtitle={
                                            <span>
                                        {new Date(tile.nextPossibleDate).toDateString()}
                                                <br/>
                                                {new Date(tile.nextPossibleDate).toTimeString()}
                                        </span>
                                        }
                                        titlePosition="bottom"
                                        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                        actionIcon={
                                            <IconButton
                                                tooltip="Details"
                                                tooltipPosition="top-left"
                                                touch={true}
                                                onClick={() => this.showActivityDetailModal(true, tile)}
                                            >
                                                <ZoomOutMap color="white"/>
                                            </IconButton>
                                        }
                                        actionPosition='right'
                                    >
                                        <img
                                            src={tile.imageUrl}
                                            alt={tile.name}
                                            style={{filter: 'sepia(50%)'}}

                                        />
                                    </GridTile>
                                ))}
                            </GridList>
                        </div>
                    </section>
                    <section className='main-right'>
                        <div className='main-right-container'>
                            <div style={{textAlign: 'center'}}>
                                <h1>{`${greeting}, ${activeUser}?`}</h1>
                                    <div style={{
                                        position: 'relative',
                                        height: 40,
                                        margin: 10
                                    }}>
                                        <Search style={{position: 'absolute', left: 0, top: 4, width: 35, height: 35, zIndex: 1}}/>
                                        <AutoComplete
                                            hintText="Search for something exciting"
                                            dataSource={autocompleteData}
                                            filter={AutoComplete.caseInsensitiveFilter}
                                            searchText={this.state.searchTerm}
                                            fullWidth={true}
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.7)',
                                                border: '1px solid #000',
                                                borderRadius: 10,
                                                height: '100%'
                                            }}
                                            textFieldStyle={{textIndent: 40, height: '100%', fontSize: 'x-large'}}
                                            hintStyle={{fontSize: 'large', bottom: 7}}
                                            inputStyle={{marginTop: 0}}
                                            underlineShow={false}
                                            onUpdateInput={this.handleUpdateSearch}
                                        />
                                    </div>
                                    <RaisedButton
                                        label="Create your own"
                                        onClick={() => this.onCreateNewModalChanged(true)}
                                        icon={<AddCircleOutline/>}
                                        labelPosition="before"
                                        style={{marginTop: 30, width: 190}}
                                        buttonStyle={{background: '#151922'}}
                                        primary={true}
                                    />
                            </div>
                        </div>
                        <FlatButton
                            label='LOG OUT'
                            style={{float: 'right', bottom: 30}}
                        />
                    </section>

                    <CreateNewModal
                        show={this.state.showCreateNewModal}
                        handleVisibility={(newState) => this.onCreateNewModalChanged(newState)}
                        requestOpenSnackbar={(message) => this.handleRequestOpenSnackbar(message)}
                    />
                    <ActivityDetailModal
                        show={this.state.showActivityDetailModal}
                        handleVisibility={(newState) => this.showActivityDetailModal(newState)}
                        activity={this.state.activity}
                        requestOpenSnackbar={(message) => this.handleRequestOpenSnackbar(message)}
                    />
                    <Snackbar
                        open={this.state.showSnackBar}
                        message={this.state.snackbarMessage}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestCloseSnackBar}
                    />
                </div>
            </CSSTransitionGroup>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchActivityData
}, dispatch)

const mapStateToProps = state => ({
    activeUser: getActiveUser(state),
    gridData: getGridData(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)