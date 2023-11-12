import { SelfStudy, Pages } from "./components/SelfStudy";
import { CurriculumVitae } from "./components/CurriculumVitae";
import { PersonalReference } from "./components/PersonalReference";
import { Home } from "./components/Home";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },

    {
        path: '/curriculum-vitae',
        element: <CurriculumVitae />
    },
    {
        path: '/personal-reference',
        element: <PersonalReference />
    },
    {
        path: '/self-study-fccReact',
        element: <SelfStudy page={Pages.fCC_react} />
    }
];

export default AppRoutes;
