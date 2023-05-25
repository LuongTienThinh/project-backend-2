import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import BaseStyle from './components/BaseStyle';
import { publicRoutes } from './routes';
import { UserProvider } from '~/contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <BaseStyle>
        <UserProvider>
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return <Route key={index} path={route.path} element={<Page />} />;
                    })}
                </Routes>
            </Router>
        </UserProvider>
    </BaseStyle>,
    // </React.StrictMode>
);
