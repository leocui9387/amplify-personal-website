import React, { Component } from 'react';
import {
    Card, CardBody, CardHeader, CardColumns,
    Row, Col
} from 'reactstrap';

import ReactMarkdown from 'react-markdown'
import {LoadingEntry} from "./basic/LogCard"

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

            const [mdText, setText] = React.useState([]);
            
            React.useEffect(() => {

                fetch("https://basic-bear-engineering.s3.amazonaws.com/MAIN.json")
                    .then(f => f.text())
                    .then(t =>{
                        const entry_count = JSON.parse(t).id_count;
                        const index_array = Array.from({length: entry_count}, (_, index) => index + 1)
                        return Promise.all(index_array.map(x =>fetch(`https://basic-bear-engineering.s3.amazonaws.com/main/${x}.json`).then()))
                    })
                    .then(f2 => f2.map(x => x.text().then(y =>{
                        setText(prevState => {

                            //console.log("previous state")
                            //console.log(prevState)

                            const tmp = [...prevState, JSON.parse(y)]
                            tmp.sort((a,b)=>(a.ID < b.ID ? 1 : -1))
                            return tmp
                        })
                    })))
                    .catch(msg => {
                        console.log("CALL to MainJournal Failed.");
                        console.log(msg);
                    });
                }, []);

            if (mdText.length === 0) { return LogCard(LoadingEntry); }

            return (mdText.map(function (item) {

                if (item.SECTION === "empty") {
                    return LogCard(LoadingEntry);
                }

                return LogCard(item);
            }));
        }

        return (
            <CardColumns>
                <GetMainJournalData />
            </CardColumns>
        );
    }


}

