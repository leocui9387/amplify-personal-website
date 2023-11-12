import React, { Component } from 'react';
import excelText from "./references/ExcelAsynchronousCall.md";
import ReactMarkdown from 'react-markdown'

export class PersonalReference extends Component {
    static displayName = PersonalReference.name;

    render() {

        
        function Renderer(text) {
            const [mdText, setText] = React.useState("error");

            React.useEffect(() => {
                fetch(excelText).then(f => f.text()).then(t => setText(t));
            }, []);

            return (<ReactMarkdown children={mdText} />);
        }

        return (
            <div>
                <Renderer/>
            </div>
        );
    }
}

