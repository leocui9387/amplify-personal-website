import React, { Component } from 'react';
import {
    UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody,
    Row, Col,List
} from "reactstrap";

import { BusinessCard, StarShips, ExampleForm } from './self_study/ReactBeginner';
import { YouTube } from './YouTube';

export const Pages = {
    fCC_react: 1
}


class FCCReact extends Component {
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

                <ExampleForm/>

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


export function SelfStudy (params){
    switch (params.page) {
        case Pages.fCC_react:
            return (<div><FCCReact /></div>);
            
        default:
            return (<div>:-(</div>);

    }
}
