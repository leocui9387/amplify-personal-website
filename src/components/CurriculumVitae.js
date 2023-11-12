import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import cvText from "./references/cv.md"

export class CurriculumVitae extends Component {
    static displayName = CurriculumVitae.name;

    render() {

        function Renderer() {
            const [mdText, setText] = React.useState("error");

            React.useEffect(() => {
                fetch(cvText).then(f => f.text()).then(t => setText(t));
                
            },[]);

            
            return (<ReactMarkdown children={mdText} />);
        }

        return (
            <Renderer/>
        );
  }
}
