import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewModal from '../../components/createNewModal';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import data from '../../data';
import axios from 'axios';
// import {GridTile} from 'material-ui/GridList';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Search from 'material-ui/svg-icons/action/search';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import {getActiveUser} from '../../modules/login';
import FlatButton from 'material-ui/FlatButton';
// import { Carousel } from 'react-responsive-carousel';
import Slider from 'react-slick';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
// import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showCreateNewModal: false,
            gridData: [],
            greeting: ''
        }
    }

    generateRandomGreeting() {
        const greetingPool = [
            "Greeting 1",
            "Greeting 2",
            "Greeting 3"
        ];
        const x = Math.floor(Math.random() * greetingPool.length);
        this.setState({greeting: greetingPool[x]})
    }

    componentDidMount() {
        this.fetchGridData();
        this.generateRandomGreeting();
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
        const {gridData, greeting} = this.state;
        console.log(gridData);
        if (!gridData || gridData.length === 0) {
            return <span />;
        }
        const {activeUser} = this.props;
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            card: {
                width: 500,
                height: 450
            },
            paper: {
                margin: 10
            }
        };
        const sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4500,
            cssEase: 'ease-in',
            easing: 'easeInOutBounce'
        }
        const data = [];
        return (
            <div>

                <AppBar
                    title={`${greeting}, ${activeUser}`}
                    titleStyle={{width: '90%', display: 'block', flex: 'none'}}
                    style={{flexWrap: 'wrap', justifyContent: 'center'}}
                    showMenuIconButton={false}
                    iconElementRight={<FlatButton label="LogOut" />}
                >
                    <div style={{position: 'relative', flex: "1 1 75%", alignSelf: 'center', height: 40, margin: 10}}>
                        <Search style={{position: 'absolute', left: 0, top: 1, width: 35, height: 35, zIndex: 1}}/>
                        <AutoComplete
                            hintText="Search for something exciting"
                            dataSource={data}
                            fullWidth={true}
                            style={{background: 'azure', border: '1px solid #000', borderRadius: 10, height: '100%'}}
                            textFieldStyle={{textIndent: 40, height: '100%', fontSize: 'x-large'}}
                            hintStyle={{fontSize: 'large', bottom: 7}}
                            inputStyle={{marginTop: 0}}
                            underlineShow={false}
                        />
                    </div>

                    <RaisedButton
                        label="Create your own"
                        onClick={() => this.onCreateNewModalChanged(true)}
                        icon={<AddCircleOutline />}
                        labelPosition="before"
                        style={{flex: '0 1 190px', alignSelf: 'center', marginLeft: 15, width: 190}}
                    />
                </AppBar>
                <p> - OR - </p>
                <Paper zDepth={1} style={styles.paper}>
                    <RaisedButton
                        label="Create your own"
                        primary={true}
                        onClick={() => this.onCreateNewModalChanged(true)}
                    />
                </Paper>
                <Paper style={{maxWidth: 700}}>
                    <Subheader>Featured appointments</Subheader>
                    <Slider {...sliderSettings}>
                        {gridData.map((tile) => (
                            <Card key={tile.objectId}>
                                <CardHeader
                                    title={tile.name}
                                />
                                <CardMedia
                                    overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                                >
                                    <img src={tile.imageUrl} alt={tile.name} />
                                </CardMedia>
                                <CardTitle title="Card title" subtitle="Card subtitle" />
                                <CardText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <FlatButton label="Action1" />
                                    <FlatButton label="Action2" />
                                </CardActions>
                            </Card>
                            // <div key={tile.name}>
                            //     <img src={tile.imageUrl} alt="" />
                            //     <p>{tile.name}</p>
                            // </div>
                        ))}
                    </Slider>
                    {/*<Slider {...sliderSettings}>*/}
                        {/*{gridData.map((tile) => (*/}
                            {/*<Card key={tile.name}>*/}
                                {/*<CardHeader*/}
                                    {/*title={tile.name}*/}
                                {/*/>*/}
                                {/*<CardMedia*/}
                                    {/*overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}*/}
                                {/*>*/}
                                    {/*<img src={tile.imageUrl} alt={tile.name} style={{maxWidth: 200, minWidth: 200}}/>*/}
                                {/*</CardMedia>*/}
                                {/*<CardText>*/}
                                    {/*{tile.description}*/}
                                {/*</CardText>*/}
                            {/*</Card>*/}
                        {/*))}*/}
                    {/*</Slider>*/}
                    {/*<div className="grid" style={styles.root}>*/}
                        {/*<GridList*/}
                            {/*cellHeight={180}*/}
                            {/*style={styles.gridList}*/}
                        {/*>*/}
                            {/*{gridData.map((tile) => (*/}
                                {/*<GridTile*/}
                                    {/*key={tile.name}*/}
                                    {/*title={tile.name}*/}

                                {/*>*/}
                                    {/*<img src={tile.imageUrl} alt={tile.name} />*/}
                                {/*</GridTile>*/}
                            {/*))}*/}
                        {/*</GridList>*/}
                    {/*</div>*/}
                </Paper>
                <CreateNewModal show={this.state.showCreateNewModal} handleVisibility={(newState) => this.onCreateNewModalChanged(newState)}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    //createNewAppointment
    getActiveUser
}, dispatch)

const mapStateToProps = state => ({
    activeUser: getActiveUser(state)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)