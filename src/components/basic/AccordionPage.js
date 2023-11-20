import React from 'react';
/*
import Markdown from "marked-react";
*/
import ReactMarkdown from 'react-markdown'
import {
    UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody,
} from 'reactstrap';


import { Pages } from '../../AppRoutes';


function FromS3(params) {

    const [entry, setEntry] = React.useState([]);
    var arnURL = Pages.filter(obj => {
        return obj.id === params.id
    })

    React.useEffect(() => {
        fetch(arnURL[0].arn)
            .then(f => f.json()).then(t => {
                console.log(t)
                setEntry(t)
            })
            .catch(msg => {
                console.log("CALL to S3 Failed.");
                console.log(msg);
            });
    }, [params]);

    console.log(JSON.stringify([{
        header: "AWS Solutions Architect - Associate",
        format: "MD",
        body: "Following Adrian Cantrill's \n[SAA-CO3](https://learn.cantrill.io/courses/enrolled/1820301) course."
    }]));

    return entry;
}

function renderByFormat(format, body) {

    if (format === "MD") {
        return (<ReactMarkdown children={body} />);
    }
    else if (format === "HTML") {
        return (<div dangerouslySetInnerHTML={{ __html: body }} />);
    } else {
        return body;
    }

}

export default function AccordionPage(params) {
    var entryData = FromS3(params);

    var accordion_itemz = entryData.map((item) => {
        return (
            <AccordionItem>
                <AccordionHeader targetId={item.id}>
                    {item.header}
                </AccordionHeader>
                <AccordionBody accordionId={item.id}>
                    {renderByFormat(item.format, item.body)}
                </AccordionBody>
            </AccordionItem>);
    });

    return (
        <UncontrolledAccordion stayOpen defaultOpen={[0]}>
            {accordion_itemz}
        </UncontrolledAccordion>);
}