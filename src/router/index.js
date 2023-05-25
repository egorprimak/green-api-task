import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Dashboard from "../pages/Dashboard/Dashboard";
import EmptyPage from "../pages/Dashboard/pages/EmptyPage/EmptyPage";
import Chat from "../pages/Dashboard/pages/Chat/Chat";
import {CHAT_PAGE, DASHBOARD_PAGE, LOGIN_PAGE} from "../consts";

export const commonRoutes = [
    {path: DASHBOARD_PAGE + '/*', element: <Dashboard /> },
    {path: LOGIN_PAGE, element: <Login /> },
    {path: '*', element: <NotFound /> }
];

export const chatRoutes = [
    {path: '', element: <EmptyPage /> },
    {path: CHAT_PAGE, element: <Chat /> },
];
