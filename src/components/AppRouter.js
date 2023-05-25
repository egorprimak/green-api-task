import React from 'react';
import {Route, Routes} from "react-router-dom";
import {commonRoutes} from "../router";

const AppRouter = () => {
    return (
        <Routes>
            {commonRoutes.map(({path, element}) =>
                <Route key={path} path={path} element={element}></Route>
            )}
        </Routes>
    );
};

export default AppRouter;
