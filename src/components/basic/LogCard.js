import ReactMarkdown from 'react-markdown'
import React from 'react';
import {
    Card, CardBody, CardHeader,
    Row, Col

} from 'reactstrap';


const chu = "https://basic-bear-engineering.s3.amazonaws.com/images/base-site/chris_chu.gif";

export const ErrorEntry = {
    ID: -1,
    TEXT_TITLE: "Error",
    TEXT_FORMAT: "HTML",
    ENTRY_DATE: new Date(1998, 11, 30),
    TEXT_VALUE: (<div><p>Error</p></div>)
}

export const LoadingEntry = {
    ID: -1,
    TEXT_TITLE: "Loading",
    TEXT_FORMAT: "HTML",
    ENTRY_DATE: new Date(1998, 11, 30),
    TEXT_VALUE: (<div><p>Loading</p><img alt="" src={chu} /></div>)
}

function LogCard(props) {

    var body;
    if (props.TEXT_FORMAT === "MD") {
        body = <ReactMarkdown children={props.TEXT_VALUE} />;
    }
    else if (props.TEXT_FORMAT === "HTML") {
        body = <div dangerouslySetInnerHTML={{ __html: props.TEXT_VALUE }} />;
    }
    else {
        body = props.TEXT_VALUE;
    }

    var tmp_date = new Date(props.ENTRY_DATE);

    return (
        <Card style={{ padding: "0.5em", margin: "0.5em 0 0.5em 0" }} outline key={props.ID}>
            <CardHeader>
                <Row>
                    <Col><b style={{ fontSize: "1.5em" }}>{props.TEXT_TITLE}</b>
                    </Col>
                    <Col style={{ textAlign: "right" }}><small>{tmp_date.toDateString()}</small>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody style={{ padding: "0.25em" }}>{body}</CardBody>
        </Card>
    );
}
export default LogCard;