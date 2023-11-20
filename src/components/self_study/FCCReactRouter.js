import React, { Component } from 'react';
import {
    UncontrolledAccordion
} from "reactstrap";

import { YouTube } from '../basic/YouTube';

export class FCCReactRouter extends Component {
    static baseURL = "https://www.youtube.com/watch?v=bMknfKXIFA8";
    render() {
        return (<div>
            <YouTube.YoutubeButton
                link={FCCReactRouter.baseURL}
                text="Free Code Camp - React Router 6 Course"
                time1={0}
                modz={{ "size": "lg" }} />
            <UncontrolledAccordion stayOpen defaultOpen={[0]}>

            </UncontrolledAccordion>
        </div>);
    }
}


