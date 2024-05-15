import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Icon } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
const Root = () => {
    return (
        <>
            <Header />
            <Center w={'100vw'}>
                <Tooltip label='Go To Home!'>
                    <a href='/demo'><Icon  boxSize={'100px'}><FaHome /></Icon></a>
                </Tooltip>
                <Tooltip label='Go To Video!'>
                    <a href='/demo/video/list'><Icon boxSize={'100px'}><FaYoutube /></Icon></a>
                </Tooltip>
                <Tooltip label='Go To Book!'>
                    <a href='/demo/book/list'><Icon boxSize={'100px'}><FaBook /></Icon></a>
                </Tooltip>
            </Center>
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;