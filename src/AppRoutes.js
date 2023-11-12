import { CurriculumVitae } from "./components/CurriculumVitae";
import { EntryForm } from "./components/EntryForm";
import { Home } from "./components/Home";

import SinglePage from "./components/SinglePage"


export const Pages = [
    {
        id: -1,
        path: ["self-study", "fcc_react"],
        title: "React"
    },
    {
        id: -2,
        path: ["self-study", "fcc_react_router"],
        title: "React Router"
    },
    {
        id: 5,
        path: ["personal-reference", "async_vba"],
        arn: "https://basic-bear-engineering.s3.amazonaws.com/ExcelAsynchronousCall.md",
        title: "Asynchronous VBA",
        type: "MD"
    },
    {
        id: 8,
        path: ["personal-reference", "data_science_final"],
        arn: "https://basic-bear-engineering.s3.amazonaws.com/InvestingPython.html",
        title: "Data Science Final",
        type: "HTML"
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
                element: <SinglePage id={item.id} />
            }

        );
    });
    return routez;
}


const AppRoutes = RouteFactory();


export default AppRoutes;
