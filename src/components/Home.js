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
            if (props.txt_fmt === "MD") {
                body = <ReactMarkdown children={props.txt_val} />;
            } else {
                body = props.txt_val;
            }

            return (
                <Card style={{ padding: "0.5em", margin: "0.5em 0 0.5em 0" }} outline key={props.id}>
                    <CardHeader>
                        <Row>
                            <Col><b style={{ fontSize: "1.5em" }}>{props.txt_title}</b>
                            </Col>
                            <Col style={{ textAlign: "right" }}><small>{(new Date(props.date)).toDateString()}</small>
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


            console.log(mdText);

            if (mdText.length === 0) { return LogCard(defaultCard); }

            var entry_objz = JSON.parse(mdText);


            return (entry_objz.map(function (item) {

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

