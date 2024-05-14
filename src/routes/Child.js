import React from 'react';
import { Outlet } from 'react-router-dom';

const Child = () => {
    return (
        <>
            <Outlet></Outlet>
        </>
    );
};

export default Child;