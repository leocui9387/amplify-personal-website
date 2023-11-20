import React, { Component } from 'react'

import {
    Alert,
    Button, Row, Col,
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle,
    Container,
    Form,
    UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody,
    List
} from 'reactstrap';

import { YouTube } from '../basic/YouTube';

const portrait = "https://basic-bear-engineering.s3.amazonaws.com/images/self-study/portrait.jpg";
const enterpriseD = "https://basic-bear-engineering.s3.amazonaws.com/images/starships/enterprised.jpg"
const enterpriseE = "https://basic-bear-engineering.s3.amazonaws.com/images/starships/enterprisee.jpg"
const starDestroyer = "https://basic-bear-engineering.s3.amazonaws.com/images/starships/stardestroyer.jpeg"
const macross = "https://basic-bear-engineering.s3.amazonaws.com/images/starships/macross.gif"


class BusinessCard extends Component {

    constructor() {
        super();
        this.state = {
            width: "15rem"
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
                            <p>I'm an intellectual wanderer:<br />
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

class StarShips extends Component {

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

            if (prop.yt) {
                youtube_link = (<YouTube.YoutubeButton link={prop.yt} text={prop.yt_cap} />);
            }

            return (
                <Card style={{ margin: "0.25em", padding: "0.5em", width: "20rem", }}>
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
                        <p align="center" style={{ fontFamily: "Teko", fontSize: "3em", fontWeight: "700" }}>Star Ships</p>
                        <Row style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", overflowX: "scroll", width: "auto" }}>
                            {slide}
                        </Row>
                    </Alert>
                </Row>
            </Container>
        );
    }
}

class ExampleForm extends Component {



    render() {

        function Formz() {
            const [fdata, dData] = React.useState({ name: "___", curry: false, disney: "none" });

            const titleStyle = { fontWeight: "bold", textAlign: "center" };
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
                    <Row style={{ display: "flex" }}>
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
                                        <label><input type="radio" name="disney" value="Star Wars" onChange={changeState} />&nbsp;Star Wars</label><br />
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
                                    <hr />
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
            <Formz />
        );
    }
}



export class FCCReact extends Component {
    static baseURL = "https://www.youtube.com/watch?v=bMknfKXIFA8";

    PersonalNotes() {
        let idNo = 0;
        return (
            <div>
                <AccordionItem>
                    <AccordionHeader targetId={idNo}>
                        Personal Notes
                    </AccordionHeader>
                    <AccordionBody accordionId={idNo}>
                        <List>
                            <li>mouse over change state 5:41</li>
                            <li>what is class based react?</li>
                            <li>look at details of the spread operator</li>
                            <li>passing states and state handlers to children 6:35</li>
                            <li>context and redux for state management</li>
                            <li>derived state thingies <a href="https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html">link</a></li>
                        </List>


                    </AccordionBody>
                </AccordionItem>
            </div>
        );
    }


    Project1() {
        let idNo = 1;
        return (<div>
            <AccordionItem>
                <AccordionHeader targetId={idNo}>
                    June 18, 2023 - Solo Project 1 - Business Card
                </AccordionHeader>
                <AccordionBody accordionId={idNo}>
                    <Row>
                        <Col sm={{ size: 'auto' }}> <BusinessCard /> </Col>
                        <Col>
                            <YouTube.YoutubeButton link={FCCReact.baseURL} text={"YouTube Bookmark"} time1={8505} />
                            <p>Solo project 1 for the React course was to build your own business card with links etc. So here it is!</p>
                        </Col>
                    </Row>
                </AccordionBody>
            </AccordionItem>
        </div>);
    }
    Project2() {

        let idNo = 2;

        return (<div>
            <AccordionItem>
                <AccordionHeader targetId={idNo}>
                    June 19, 2023 - Solo Project 2 - Starship Journal
                </AccordionHeader>
                <AccordionBody accordionId={idNo}>
                    <Row>
                        <YouTube.YoutubeButton link={FCCReact.baseURL} text={"YouTube Bookmark"} time1={16613} />
                        <p>Solo project 2 for the React course was to build your own travel log.
                            However, I'm not much of a traveler, but I am a giant nerd.
                            So here are my favorite starships.</p>

                        <p>Requirements:
                            <ul>
                                <li>use data array from separate file</li>
                                <li>use map() and props</li>
                                <li>styled and polished</li>
                            </ul>
                        </p>
                    </Row>
                    <Row>
                        <StarShips />
                    </Row>
                </AccordionBody>
            </AccordionItem>
        </div>);
    }
    BookReport1() {
        let idNo = 3;
        // About FORMShttps://open.spotify.com/playlist/37i9dQZF1DWXWbLEOaHnU3
        var baseURL = "https://react.dev/reference/react-dom/components/input";
        return (
            <AccordionItem>
                <AccordionHeader targetId={idNo}>
                    June 20, 2023 - Reading Report - Forms Documentation
                </AccordionHeader>
                <AccordionBody accordionId={idNo}>
                    <YouTube.YoutubeButton link={FCCReact.baseURL} text={""} time1={28299} />
                    <b>Report on Interesting things from the <a href={baseURL}>Forms React Documentation</a></b>
                    < List >
                        <li>captures are kinda creepy <a href="https://react.dev/learn/responding-to-events#capture-phase-events">LINK</a></li>
                        <li>{"<input> should be inside <label>"} (<a href={baseURL + "#providing-a-label-for-an-input"}>LINK</a>)</li>
                        <li>any &lt;button&gt; will submit? weird (above <a href={baseURL + "#controlling-an-input-with-a-state-variable"}>LINK</a>)</li>
                        <li>interesting that you directly send state variables to the <b>value</b> attribute to make it <b>controlled</b> but
                            you generally don't want to directly modify state variables. You're supposed to use those <b>set[...]</b> functions.</li>
                        <li>if <b>value</b> is passed and there isn't an <b>onChange</b> then you'll never be able to change the input box.</li>
                        <li>originally had a question of why would you not want all states to be at the top parent level because it's like
                            <b>inversion of control/dependency injection</b>. However, it appears like there's a performance hit from
                            rerendering at the level of the state, which is why you want states to be as low as possible.
                            (<a href={baseURL + "#optimizing-re-rendering-on-every-keystroke"}>LINK</a>)</li>
                        <li><b><a href="https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui">useDeferredValue</a></b>
                            is also supposed to be good when you need to pass a state variable to slow rendering components. <b>memo</b> should also be used because it
                            updates only when it's <b>props</b> aren't changed.</li>
                        <li>Interesting issue with <b>resetting state</b> on each key stroke.(<a href="https://react.dev/learn/preserving-and-resetting-state">LINK</a>)
                            seems kinda contradictory to the "don't directly modify the state variable" replace it instead mindset.</li>
                    </List >

                    <ExampleForm />

                </AccordionBody>
            </AccordionItem>
        );
    }

    render() {
        return (<div>
            <YouTube.YoutubeButton
                link={FCCReact.baseURL}
                text="Free Code Camp - React Course - Beginner's Tutorial for React JavaScript Library [2022]"
                time1={0}
                modz={{ "size": "lg" }} />
            <UncontrolledAccordion stayOpen defaultOpen={[0]}>
                <this.PersonalNotes />
                <this.BookReport1 />
                <this.Project2 />
                <this.Project1 />
            </UncontrolledAccordion>
        </div>);
    }
}
