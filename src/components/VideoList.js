import {
    Box, Icon, Heading, TableContainer, Table, Tbody, Thead, Tfoot, Tr, Th, Td, Button, ButtonGroup,
    Stack, HStack, VStack, IconButton,
    useColorMode,
    useColorModeValue,
    Center,
    Img,
    Text,
    Image,
    Container
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@chakra-ui/react'
import { FaYoutube } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { Form, redirect, useNavigate } from 'react-router-dom';

const VideoList = () => {
    // const [count,setCount] = useState(1);
    // useRef 는 화면 랜더링 반영되지 않는 참조값
    const pageCount = useRef(1);
    // useState는 화면 랜더링에 반영됨
    const [videoList, setVideoList] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("강아지똥");

    // Chakra UI 에서 제공하는 훅
    const { colorMode, toggleColorMode } = useColorMode();
    const color = useColorModeValue('red.500', 'red.200');
    const buttonScheme = useColorModeValue("blackAlpha", "whiteAlpha");

    const navigate = useNavigate();
    const fetchVideos = async () => {
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


        pageCount.current = data.meta.pageable_count % 10 > 0
            ? data.meta.pageable_count / 10 + 1
            : data.meta.pageable_count / 10;
        pageCount.current = Math.floor(pageCount.current);
        pageCount.current = pageCount.current > 15 ? 15 : pageCount.current;



        setVideoList(data.documents);
    };

    const changeSearch = e => {
        if ((e.type === "keydown" && e.keyCode == 13) || e.type === "click") {
            const searchValue = document.getElementById('search-value').value;
            console.log(searchValue);
            // if (searchValue === null || searchValue === "") {
            //     searchValue = "강아지똥";
            // }
            document.getElementById('search-value').value = '';
            // setSearch(searchValue);
        }
        // if (e.target.value.length > 1) {
        //     setSearch(e.target.value);
        // }

    };

    useEffect(() => {
        fetchVideos();
    }, [search, page])

    return (
        <>
            <Center w={'100vw'}>
                <Heading color={color}>
                    <Icon as={FaYoutube} boxSize={"1.5em"} w={10} h={8} />
                    추천 동영상 목록
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

            <HStack flexWrap={'wrap'}>
                {videoList.map((video, index) => (
                    <Container width={'17%'}>
                        <a href={video.url}>
                            <Center>
                                <Img src={video.thumbnail} w={'200px'} h={'auto'}></Img>
                            </Center>
                            <Center>
                                <Text>{video.title}</Text>
                            </Center>
                            <Center>
                                <Text>{video.author}</Text>
                            </Center>
                            <Center>
                                <Text>{video.play_time}초</Text>
                            </Center>
                        </a>
                    </Container>
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

export default VideoList;