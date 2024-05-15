import {
    Box, Icon, Heading, TableContainer, Table, Tbody, Thead, Tfoot, Tr, Th, Td, Button, ButtonGroup,
    Stack, HStack, VStack, IconButton,
    useColorMode,
    useColorModeValue,
    Center,
    Image
} from '@chakra-ui/react';

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Input } from '@chakra-ui/react'
import { FaYoutube } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Form, redirect, useNavigate } from 'react-router-dom';

const SearchVideo = () => {
    const [params] = useSearchParams();
    // Chakra UI 에서 제공하는 훅
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('red.500', 'red.200');
    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const paramsObj = Object.fromEntries([...params]);
    const query = paramsObj.query;
    const pageCount = useRef(1);

    const [page, setPage] = useState(1);
    const [videoList, setVideoList] = useState([]);
    const fetchVideos = async () => {
        const response = await fetch(
            `https://dapi.kakao.com/v2/search/vclip?query=${query}&page=${page}`,
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



        setVideoList(data.documents);
    };

    useEffect(() => {
        fetchVideos();
    }, [page])

    return (
        <>
            <Center w={'100vw'}>
                <Heading color={color}>
                    <Icon as={FaYoutube} boxSize={"1.5em"} />
                    검색한 동영상 목록
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
                <Table size='sm' colorScheme="whiteAlpha" >
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Tumbnail</Th>
                            <Th>Contents</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {videoList.map((video, index) => (
                            <>
                                <Tr>
                                    <Td>{(page - 1) * 10 + index + 1}</Td>
                                    <Td><a href={video.url}><Image src={video.thumbnail} w={'300px'} h={'auto'}></Image></a></Td>
                                    <Td flexDirection={'column'} ><div>Title : {video.title}</div><div>Chanel :  {video.author}</div><div>Play Time :  {video.play_time}초</div></Td>
                                </Tr>

                            </>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>


            <HStack>
                <Center w={'100vw'} mt={'10px'}>
                    {Array.from({ length: pageCount.current }, (_, index) => (
                        <>
                            <Button mr={'10px'} colorScheme={
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

export default SearchVideo;