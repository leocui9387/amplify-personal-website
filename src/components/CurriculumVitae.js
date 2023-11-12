import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'


export class CurriculumVitae extends Component {
    static displayName = CurriculumVitae.name;

    render() {

        function Renderer() {
            const [mdText, setText] = React.useState("error");

            React.useEffect(() => {
                fetch("https://basic-bear-engineering.s3.amazonaws.com/cv.md").then(f => f.text()).then(t => setText(t));

            }, []);


            return (<ReactMarkdown children={mdText} />);
        }

        return (
            <Renderer />
        );
    }
}
