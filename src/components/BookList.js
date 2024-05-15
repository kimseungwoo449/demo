import {
    Box, Icon, Heading, TableContainer, Table, Tbody, Thead, Tfoot, Tr, Th, Td, Button, ButtonGroup,
    Stack, HStack, VStack, IconButton,
    useColorMode,
    useColorModeValue,
    Img,
    Image,
    Center,
    Text,
    Tooltip,
    Container
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@chakra-ui/react'
import { FaBook } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Form } from 'react-router-dom';

const BookList = () => {
    // const [count,setCount] = useState(1);
    // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);
    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("강아지똥");

    // Chakra UI 에서 제공하는 훅
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('red.500', 'red.200');
    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v3/search/book?query=${search}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                }
            }
        );
        const data = await response.json();


        pageCount.current = data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;



        setBookList(data.documents);
    };

    useEffect(() => {
        fetchBooks();
    }, [search, page])

    return (
        <>
            <Center w={'100vw'}>
                <Heading color={color}>
                    <Icon as={FaBook} boxSize={"1.5em"} />
                    책 검색 목록
                </Heading>
            </Center>
            {
                colorMode === "light" ?
                    <IconButton icon={<FaMoon />} onClick={toggleColorMode} size={"lg"} /> :
                    <IconButton icon={<FaSun />} onClick={toggleColorMode} size={"lg"} />
            }

            <Form action='/book/search'>
                <HStack>
                    <Input type='text' name='query' placeholder='검색할 내용' id='search-value' size='lg' variant='filled' w={'80%'} />
                    <Input type='submit' value={'검색'} w={'20%'} />
                </HStack>

            </Form>


            <HStack flexWrap={'wrap'}>
                {bookList.map((book, index) => (
                    <Tooltip label={book.contents.length > 30 ? book.contents.slice(0, 30) + "..." : book.contents}>

                        <Container width={'17%'}>
                            <a href={book.url}>
                                <Center>
                                    <Img src={book.thumbnail} w={'auto'} h={'200px'}></Img>
                                </Center>
                                <Center>
                                    <Text>{book.title}</Text>
                                </Center>
                                <Center>
                                    <Text>{book.authors}</Text>
                                </Center>
                                <Center>
                                    <Text>{book.isbn}</Text>
                                </Center>
                            </a>
                        </Container>
                    </Tooltip>
                ))}
            </HStack>


            <HStack>
                <Center w={'100vw'} mt={'10px'}>
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <>
                            <Button mr={'5px'} colorScheme={
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

export default BookList;