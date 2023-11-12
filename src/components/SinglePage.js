import React from 'react';
import ReactMarkdown from 'react-markdown'

import { ErrorEntry } from './LogCard';
import { FCCReact, FCCReactRouter } from "./SelfStudy"
import { Pages } from '../AppRoutes';

function FromS3(params) {

    const [entry, setEntry] = React.useState([ErrorEntry]);
    var arnURL = Pages.filter(obj => {
        return obj.id === params.id
    })
    console.log("LEO");
    console.log(params.id);
    console.log(Pages);
    console.log(arnURL);

    React.useEffect(() => {
        fetch(arnURL[0].arn)
            .then(f => f.text()).then(t => {
                setEntry([{
                    ID: 0,
                    TEXT_TITLE: "?",
                    TEXT_FORMAT: arnURL[0].type,
                    ENTRY_DATE: new Date(1998, 11, 30),
                    TEXT_VALUE: t
                }])
            })
            .catch(msg => {
                console.log("CALL to MainJournal Failed.");
                console.log(msg);
            });
    }, []);

    return entry;
}

function FromJS(params) {

    switch (params.id) {
        case -1:

            return {
                TEXT_VALUE: <FCCReact />
            };
        case -2:
            return { TEXT_VALUE: < FCCReactRouter /> };

        default:
            return "Default Failed";
    }
}


export default function SinglePage(params) {
    var entryData;

    if (params.id > 0) {
        entryData = FromS3(params)[0];
    } else {
        entryData = FromJS(params);
    }

    console.log(entryData);

    if (entryData.TEXT_FORMAT === "MD") {
        return (<ReactMarkdown children={entryData.TEXT_VALUE} />);
    }
    else if (entryData.TEXT_FORMAT === "HTML") {
        return (<div dangerouslySetInnerHTML={{ __html: entryData.TEXT_VALUE }} />);

    } else {

        return entryData.TEXT_VALUE;
    }
}