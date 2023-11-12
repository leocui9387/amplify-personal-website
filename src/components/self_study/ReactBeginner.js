import React, { Component } from 'react'
import portrait from "../../images/portrait.jpg"

import enterpriseD from "../../images/starships/enterprised.jpg"
import enterpriseE from "../../images/starships/enterprisee.jpg"
import starDestroyer from "../../images/starships/stardestroyer.jpeg"
import macross from "../../images/starships/macross.gif"

import {
    Alert,
    Button, Row, Col,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, 
    Container,
    Form
} from 'reactstrap';
import { YouTube } from '../YouTube';

export class BusinessCard extends Component {

    constructor() {
        super();
        this.state = {
            width : "15rem"
        };
    }
    newEmail() {
        window.open("mailto:Basic.Bear@outlook.com?subject=Contact");
    }
    newLinkedIn() {
        window.open("https://www.linkedin.com/in/leo-cui-5b333532/");
    }

    render() {
        
        /* FAILED Business Card in a Container
        return (
            <Container >
                    <Row><img src={portrait} />
                    </Row>
                    <Row align="center">
                        <h1><b>Leo Cui</b></h1>
                        <h5>Full Stack Developer</h5>
                        
                    </Row>
                    <Row align="center" >
                        <Col>
                            <Button color="primary" outline block>Email</Button>
                        </Col>
                        <Col>
                            <Button color="primary" outline block>LinkedIn</Button>
                        </Col>
                        
                    </Row>
                    <Row>
                        <b>About</b>
                        <p>hi stuff about me</p>
                    </Row>
                    <Row>
                        <b>Interests</b>
                        <p>More stuff about me</p>
                    </Row>

                </Container> 
        ); */

        return (
            <Card style={{
                width: this.state.width
            }}>
                <CardImg src={portrait} />
                <CardBody>

                    <CardTitle tag="h5">
                        Leo Cui
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Software Developer
                    </CardSubtitle>
                    <Row align="center" >
                        <Col>
                            <Button color="primary" outline block size="sm" onClick={this.newEmail}>Email</Button>
                        </Col>
                        <Col>
                            <Button color="primary" outline block size="sm" onClick={this.newLinkedIn}>LinkedIn</Button>
                        </Col>

                    </Row>
                    <CardText>
                        <Row>
                            <b>About</b>
                            <p>I'm an intellectual wanderer:<br/>
                            Stocks &#x219d; Medical &#x219d; Accounting &#x219d; Tech</p>
                            
                        </Row>
                        <Row>
                            <b>Interests</b>
                            <p>I like learning about the cutting edge technology trends and putting bets on them.</p>
                        </Row>
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}


export class StarShips extends Component {

    static GetData() {
        let starships = [
            {
                rank: 1,
                src: enterpriseD,
                title: "Enterprise NCC-1701-D",
                class: "Galaxy",
                captain: "Jean-Luc Picard",
                caption: "Star Trek: The Next Generation was one of my favorites growing up. The first sci-fi show I saw when I moved to the US, so it's has a special place in my heart.",
                yt: "https://youtu.be/HnDtvZXYHgE",
                yt_cap: "Intro"

            },
            {
                rank: 2,
                src: enterpriseE,
                title: "Enterprise NCC-1701-E",
                class: "Sovereign",
                captain: "Jean-Luc Picard",
                caption: "I liked Star Trek: First Contact. I saw it when I was a child. What do you expect?\nCredit:jetfreak-7, Deviant Art",
                yt: null,
                yt_cap: null
            },
            {
                rank: 3,
                src: starDestroyer,
                title: "Imperial Star Destroyer",
                class: "Imperial",
                captain: "Various",
                caption: "Nice clean look. Dreadnaught class star destroyers seemed gratuitously large without significantly more power. Oddly enough, about the same size as the Enterprise D.",
                yt: "https://youtu.be/m_Loc7qX7FI?t=58",
                yt_cap: "Size Comp"
            },
            {
                rank: 4,
                src: macross,
                title: "SDF-1 Macross",
                class: "Macross",
                captain: "Bruno J. Global",
                caption: "The first anime I enjoyed. Also has a lot of WW2 tropes, and I like history, so good combination.",
                yt: null,
                yt_cap: null
            }


           
        ]
        
               
        return starships;
    
    }

    render() {
        const CustomCard = (prop) => {

            var youtube_link = "";

            if (prop.yt){
                youtube_link = (<YouTube.YoutubeButton link={prop.yt} text={prop.yt_cap } />);
            }

            return (
                <Card style={{margin:"0.25em", padding:"0.5em", width: "20rem", }}>
                    <CardImg src={prop.src} alt="error" />
                    <CardTitle><div align="center" style={{ fontFamily: "Teko", fontSize: "1.5em", fontWeight: "700" }}>{prop.title}</div></CardTitle>
                    <CardBody>
                        {prop.caption} 
                    </CardBody>
                    {youtube_link}
                </Card>
            );
        }

        let items = StarShips.GetData();
        let slide = items.map(i => CustomCard(i))

        return (
            <Container>
                <Row>
                    <Alert color="info" style={{ padding: "1em 1.25em .25em 1.25em" }}>
                        <p align="center" style={{ fontFamily: "Teko", fontSize: "3em", fontWeight: "700"}}>Star Ships</p>
                        <Row style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", overflowX: "scroll", width: "auto" }}>
                            {slide}
                        </Row>
                    </Alert>
                </Row>
            </Container>
        );
    }
}

export class ExampleForm extends Component {

    

    render() {

        function Formz() {
            const [fdata, dData] = React.useState({name:"___",curry:false, disney:"none"});

            const titleStyle = {fontWeight:"bold", textAlign:"center"};
            const cardStyle = { height: "100%" };
            
            function changeState(event) {

                const trg = event.target;

                if (trg.type === "checkbox") {
                    dData({ ...fdata, [trg.name]: trg.checked });
                } else {
                    dData({ ...fdata, [trg.name]: trg.value });
                }            
            }

            return (
                <Alert color="info">
                    <Row></Row>
                    <Row style={{display: "flex"}}>
                        <Col>
                            <Card style={cardStyle}>
                                <CardTitle><Alert color="danger" style={titleStyle}>Form</Alert></CardTitle>
                                <CardBody>
                                    <Form>
                                        <label> Name <input name="name" type="text" placeholder="placeheld" value={fdata.name} onChange={changeState} /></label>
                                        <hr />
                                        <label> Love Curry? <input type="checkbox" name="curry" checked={fdata.curry} onChange={changeState} /></label>
                                        <hr />
                                        Radio Disney Favorite:<br />
                                        <label><input type="radio" name="disney" value="Star Wars" onChange={changeState} />&nbsp;Star Wars</label><br/>
                                        <label><input type="radio" name="disney" value="Iron Man" onChange={changeState} />&nbsp;Iron Man</label><br />
                                        <label><input type="radio" name="disney" value="Guardians" onChange={changeState} />&nbsp;Guardians of the Galaxy</label><br />
                                        <label><input type="radio" name="disney" value="America" onChange={changeState} />&nbsp;Captain America</label><br />
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={cardStyle}>
                                <CardTitle><Alert color="warning" style={titleStyle}>Displayer</Alert></CardTitle>
                                <CardBody>
                                    <b>NAME: {fdata.name}</b> 
                                    <hr/>
                                    <b>{fdata.name + (!fdata.curry ? " doesn't" : "") + " loves Curry! " + (!fdata.curry ? "\u{1F4A9}" : "\u2764")}</b> 
                                    <hr />
                                    Favorite is {fdata.disney}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Alert>
            
            );
        }
        

        return (
            <Formz/>
        );
    }
}