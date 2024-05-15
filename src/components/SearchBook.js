import {
    Box, Icon, Heading, TableContainer, Table, Tbody, Thead, Tfoot, Tr, Th, Td, Button, ButtonGroup,
    Stack, HStack, VStack, IconButton,
    useColorMode,
    useColorModeValue,
    Center,
    Img,
    Text,
    Tooltip
} from '@chakra-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Input } from '@chakra-ui/react'
import { FaBook } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Form, redirect, useNavigate } from 'react-router-dom';

const SearchBook = () => {
    const [params] = useSearchParams();
    // Chakra UI 에서 제공하는 훅
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('red.500', 'red.200');
    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const paramsObj = Object.fromEntries([...params]);
    const query = paramsObj.query;
    const pageCount = useRef(1);

    const [page, setPage] = useState(1);
    const [bookList, setBookList] = useState([]);
    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${query}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                }
            }
        );
        const data = await response.json();
        console.log(data.meta.pageable_count);

        pageCount.current = data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;

        setBookList(data.documents);
    };

    useEffect(() => {
        fetchBooks();
    }, [page])

    return (
        <>
            <Center w={'100vw'}>

                <Heading color={color}>
                    <Icon as={FaBook} boxSize={"1.5em"} />
                    검색한 책 목록
                </Heading>
            </Center>
            {
                colorMode === "light" ?
                    <IconButton icon={<FaMoon />} onClick={toggleColorMode} size={"lg"} /> :
                    <IconButton icon={<FaSun />} onClick={toggleColorMode} size={"lg"} />
            }
            <Form action='/video/search'>
                <HStack>
                    <Input type='text' name='query' placeholder='검색할 내용' id='search-value' size='lg' variant='filled' w={'80%'} />
                    <Input type='submit' value={'검색'} w={'20%'} />
                </HStack>

            </Form>
            <TableContainer>
                <Table size='sm' colorScheme="teal" variant='striped'>
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Image</Th>
                            <Th>title</Th>
                            <Th>Autors</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {bookList.map((book, index) => (
                            <>
                                <Tooltip label={book.contents.length > 30 ? book.contents.slice(0, 30) + "..." : book.contents}>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td><a href={book.url}><Img src={book.thumbnail} w={'auto'} h={'200px'}></Img></a></Td>
                                        <Td><a href={book.url}>{book.title}</a></Td>
                                        <Td>{book.authors}</Td>
                                    </Tr>

                                </Tooltip>
                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>


            <HStack>
                <Center w={'100vw'} mt={'10px'}>
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <>
                            <Button colorScheme={
                                page === index + 1 ?
                                    "red" : buttonScheme
                            } onClick={e => { setPage(index + 1) }}>
                                {index + 1}
                            </Button>

                        </>
                    ))}
                </Center>
            </HStack>

        </>
    );
};

export default SearchBook;