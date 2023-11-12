import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, CardColumns,
    Row, Col
} from 'reactstrap';

import ReactMarkdown from 'react-markdown'

import chu from "../images/chris_chu.gif";

export class Home extends Component {
    static displayName = Home.name;

    render() {
        function LogCard(props) {

            var body;
            if (props.TEXT_FORMAT === "MD") {
                body = <ReactMarkdown children={props.TEXT_VALUE} />;
            } else {
                body = props.TEXT_VALUE;
            }

            return (
                <Card style={{ padding: "0.5em", margin: "0.5em 0 0.5em 0" }} outline key={parseInt(props.ID)} >
                    <CardHeader>
                        <Row>
                            <Col><b style={{ fontSize: "1.5em" }}>{props.TEXT_TITLE}</b>
                            </Col>
                            <Col style={{ textAlign: "right" }}><small>{(new Date(props.ENTRY_DATE)).toDateString()}</small>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody style={{ padding: "0.25em" }}>{body}</CardBody>
                </Card>
            );
        }

        function GetMainJournalData() {
            const [mdText, setText] = React.useState("[{\"id\":-1, \"SECTION\":\"empty\"}]");

            var defaultCard = {
                id: -1,
                txt_title: "Loading",
                txt_fmt: "HTML",
                date: new Date(1998, 11, 30),
                txt_val: (<div>Loading<img alt="" src={chu} /></div>)
            };

            React.useEffect(() => {
                fetch("https://basic-bear-engineering.s3.amazonaws.com/MAIN.json")
                    .then(f => f.text()).then(t => setText(t))
                    .catch(msg => {
                        console.log("CALL to MainJournal Failed.");
                        console.log(msg);
                    });
            }, []);

            if (mdText.length === 0) { return LogCard(defaultCard); }

            var entry_objz = JSON.parse(mdText);


            return (entry_objz.reverse().map(function (item) {

                if (item.SECTION === "empty") {

                    return LogCard(defaultCard);
                }

                return LogCard(item);
            }));
        }


        /*
        <LogCard props={Azure} />
              <LogCard props={defaultCard} />
              <LogCard props={FCC_React} />
              
        <TestFetch />
        
        */

        return (
            <CardColumns >
                <GetMainJournalData />
            </CardColumns>
        );
    }


}

