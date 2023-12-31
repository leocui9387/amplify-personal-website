import { CurriculumVitae } from "./components/CurriculumVitae";
import { EntryForm } from "./components/EntryForm";
import { Home } from "./components/Home";

import SinglePage from "./components/basic/SinglePage"
import AccordionPage from "./components/basic/AccordionPage"


export const Pages = [
    {
        id: -1
        , path: ["self-study", "fcc_react"]
        , title: "React"
        , source: "JS"
        , base: SinglePage
    },
    {
        id: -2
        , path: ["self-study", "fcc_react_router"]
        , title: "React Router"
        , source: "JS"
        , base: SinglePage
    },
    {
        id: -3
        , path: ["self-study", "aws-sap-c02"]
        , title: "AWS Solutions Architect - Professional"
        , arn: "https://basic-bear-engineering.s3.amazonaws.com/self-study/AWS-SAP-C02.md"
        , source: "S3"
        , type: "MD"
        , base: SinglePage
    },
    {
        id: -4
        , path: ["self-study", "aws-saa-c03"]
        , title: "AWS Solutions Architect - Associate"
        , arn: "https://basic-bear-engineering.s3.amazonaws.com/self-study/AWS-SAA-C03.json"
        , source: "S3"
        , type: "MD"
        , base: AccordionPage
    },
    {
        id: 5,
        path: ["personal-reference", "async_vba"],
        arn: "https://basic-bear-engineering.s3.amazonaws.com/ExcelAsynchronousCall.md",
        title: "Asynchronous VBA",
        type: "MD"
        , source: "S3"
        , base: SinglePage
    },
    {
        id: 8,
        path: ["personal-reference", "data_science_final"],
        arn: "https://basic-bear-engineering.s3.amazonaws.com/InvestingPython.html",
        title: "Data Science Final",
        type: "HTML"
        , source: "S3"
        , base: SinglePage
    }
];

function RouteFactory() {
    var routez = [
        {
            index: true,
            element: <Home />
        },
        {
            path: '/curriculum-vitae',
            element: <CurriculumVitae />
        },
        {
            path: '/new-entry',
            element: <EntryForm />
        },

    ];

    const aggURL = (acc, next) => { return acc + "/" + next };

    Pages.forEach(item => {
        routez.push(
            {
                path: item.path.reduce(aggURL, ""),
                element: <item.base id={item.id} source={item.source} />
            }

        );
    });

    return routez;
}


const AppRoutes = RouteFactory();


export default AppRoutes;
