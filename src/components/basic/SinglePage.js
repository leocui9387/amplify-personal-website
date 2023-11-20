import React from 'react';
import ReactMarkdown from 'react-markdown'

import { ErrorEntry } from './LogCard';

import { FCCReact } from "../self_study/FCCReact";
import { FCCReactRouter } from "../self_study/FCCReactRouter";

import { Pages } from '../../AppRoutes';

function FromS3(params) {

    const [entry, setEntry] = React.useState([ErrorEntry]);
    var arnURL = Pages.filter(obj => {
        return obj.id === params.id
    })

    React.useEffect(() => {
        fetch(arnURL[0].arn)
            .then(f => f.text()).then(t => {
                setEntry([{
                    ID: 0,
                    TEXT_TITLE: arnURL[0].title,
                    TEXT_FORMAT: arnURL[0].type,
                    ENTRY_DATE: new Date(1998, 11, 30),
                    TEXT_VALUE: t
                }])
            })
            .catch(msg => {
                console.log("CALL to S3 Failed.");
                console.log(msg);
            });
    }, [params]);

    return entry;
}

function FromJS(params) {

    switch (params.id) {
        case -1:
            return {
                TEXT_VALUE: <FCCReact />
            };
        case -2:
            return { TEXT_VALUE: <FCCReactRouter /> };

        default:
            return "Default Failed";
    }
}


export default function SinglePage(params) {
    var entryData;

    if (params.source == "S3") {
        entryData = FromS3(params)[0];
    } else if (params.source == "JS") {
        entryData = FromJS(params);
    }

    if (entryData.TEXT_FORMAT === "MD") {
        return (<ReactMarkdown children={entryData.TEXT_VALUE} />);
    }
    else if (entryData.TEXT_FORMAT === "HTML") {
        return (<div dangerouslySetInnerHTML={{ __html: entryData.TEXT_VALUE }} />);
    } else {
        return entryData.TEXT_VALUE;
    }
}