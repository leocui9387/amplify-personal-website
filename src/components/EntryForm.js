
import React, { Component } from 'react'
import {
    Alert, Button,
    Row, Col,
    Card, CardBody, CardTitle,

    Form, FormGroup, Label, Input
} from 'reactstrap';
import LogCard from './LogCard';
export class EntryForm extends Component {

    render() {
        const titleStyle = { fontWeight: "bold", textAlign: "center" };
        const cardStyle = { height: "100%" };
        function DisplaySide({ data }) {
            var thingy = new Date(data.date);
            thingy.setDate(thingy.getDate() + 1);

            const propTranslation = {
                TEXT_TITLE: data.title,
                TEXT_VALUE: data.body,
                TEXT_FORMAT: data.format,
                ENTRY_DATE: thingy.toDateString()
            };


            return (<Card style={cardStyle}>
                <CardTitle>
                    <Alert color="warning" style={titleStyle}>Displayer</Alert>
                </CardTitle>
                <CardBody>
                    {LogCard(propTranslation)}
                </CardBody>
            </Card>);
        }
        function EntrySide({ data, changeFn }) {

            function generateSQL(event) {
                event.preventDefault();

                console.log(data);
                fetch('/api/entries', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)

                }).then((response) => {
                    /*
                    console.log("then response:");
                    console.log(JSON.stringify(response));
                    console.log(response);
                    */
                    alert("it worked!");

                    /*
                    }).then((data) => {
                        console.log("data response:");
                        console.log(JSON.stringify(data));
                    */

                }).catch((err) => {
                    alert("FAILED");

                    /* 
                    console.log("err response:");
                    console.log(JSON.stringify(err.message));
                    */
                });
            }

            return (<Card style={cardStyle}>
                <CardTitle><Alert color="danger" style={titleStyle}>Input</Alert></CardTitle>
                <CardBody height="100%">
                    <Form onSubmit={generateSQL}>
                        <FormGroup>
                            <Label for="titleBox">
                                Title
                            </Label>
                            <Input id="titleBox" name="title" type="text" placeholder="Enter Title" value={data.title} onChange={changeFn} />
                        </FormGroup>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="sectionBox">
                                        Section
                                    </Label>
                                    <Input id="sectionBox" name="section" type="text" placeholder="Enter Section" value={data.section} onChange={changeFn} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="formatBox">
                                        Format
                                    </Label>
                                    <Input
                                        id="formatBox"
                                        name="format"
                                        type="text"
                                        placeholder="Enter Format"
                                        value={data.format}
                                        onChange={changeFn} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleDate">
                                        Date
                                    </Label>
                                    <Input
                                        id="exampleDate"
                                        name="date"
                                        value={data.date}
                                        onChange={changeFn}
                                        type="date"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="notesBox">
                                Notes
                            </Label>
                            <Input
                                id="notesBox"
                                name="notes"
                                type="text"
                                placeholder="Enter Notes"
                                value={data.notes}
                                onChange={changeFn} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="bodyText">
                                Body
                            </Label>
                            <Input
                                id="bodyText"
                                name="body"
                                type="textarea"
                                value={data.body}
                                onChange={changeFn}
                                rows="15"
                            />
                        </FormGroup>
                        <div align="right">
                            <Button color="primary">SUBMIT</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>);
        }
        function Formz() {
            var tmp = new Date(Date.now());
            const [fdata, dData] = React.useState({
                title: "",
                section: "",
                date: tmp.toISOString().split("T")[0],
                body: "",
                notes: "",
                format: ""
            });

            function changeState(event) {

                const trg = event.target;

                if (trg.type === "checkbox") {
                    dData({ ...fdata, [trg.name]: trg.checked });
                } else {
                    dData({ ...fdata, [trg.name]: trg.value });
                }
            }

            return (
                <Alert color="info" >
                    <Row></Row>
                    <Row style={{ display: "flex" }}>
                        <Col>
                            <EntrySide data={fdata} changeFn={changeState} />
                        </Col>
                        <Col>
                            <DisplaySide data={fdata} />
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
