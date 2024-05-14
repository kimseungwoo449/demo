import { Box, Icon, Heading, TableContainer, Table, Tbody, Thead, Tfoot, Tr, Th, Td, Button, ButtonGroup, 
    Stack, HStack, VStack,IconButton, 
    useColorMode,
    useColorModeValue} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@chakra-ui/react'
import { FaYoutube } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const BookList = () => {
    // const [count,setCount] = useState(1);

    // useState는 화면 랜더링에 반영됨
    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('강아지똥');
    // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);

    // Chakra UI 에서 제공하는 훅
    const {colorMode,toggleColorMode} = useColorMode();
    const color = useColorModeValue('red.500', 'red.200');
    const buttonScheme = useColorModeValue("blackAlpha","whiteAlpha");

    const fetchBooks = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${search}&page=${page}`,
            {
                method: "GET",
                headers: {
                    Authorization: `KakaoAK ${process.env.REACT_APP_API_KEY}`,
                }
            }
        );
        const data = await response.json();
        console.log(data);

        pageCount.current = data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;
        console.log(pageCount);


        setBookList(data.documents);
    };

    const changeSearch = e => {
        // if(e.keyCode==13){
        //     // let searchValue = document.getElementById('search-value').value;
        //     // document.getElementById('search-value').value = '';
        //     setSearch(e.target.value);
        //     e.taget.value = '';
        // }

        if (e.target.value.length > 1) {
            setSearch(e.target.value);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [search, page])

    return (
        <>
            <Heading color={color}>
                <Icon as={FaYoutube} boxSize={"1.5em"} />
                동영상 검색 목록
            </Heading>
            {
                colorMode === "light"?
                <IconButton icon={<FaMoon/>} onClick={toggleColorMode} size={"lg"} /> :
                <IconButton icon={<FaSun/>} onClick={toggleColorMode} size={"lg"} />
            }
            <Box>
                <Input type='text' placeholder='검색할 내용' id='search-value' onChange={changeSearch} size='lg' variant='filled'>
                </Input>
                <TableContainer>
                    <Table size='sm' colorScheme="teal" variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Title</Th>
                                <Th>Author</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookList.map((book, index) => (
                                <>
                                    <Tr>
                                        <Td>{(page - 1) * 10 + index + 1}</Td>
                                        <Td><a href={book.url}>{book.title}</a></Td>
                                        <Td>{book.author}</Td>
                                    </Tr>
                                </>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>


            <HStack>
                {Array.from({ length: pageCount.current }, (_, index) => (
                    <>
                        <Button colorScheme={
                            page === index+1?
                            "red":buttonScheme
                        } onClick={e => { setPage(index + 1) }}>
                            {index + 1}
                        </Button>

                    </>
                ))}
            </HStack>

        </>
    );
};

export default BookList;