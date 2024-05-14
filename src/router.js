import { createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import VideoList from "./components/VideoList";
import Child from "./routes/Child";

// 라우터 설계
/*

GET     /demo/video                     추천 영상 목록 페이지
GET     /demo/video/list                추천 영상 목록 페이지
GET     /demo/video/search              검색 도서 목록 페이지

GET     /demo/book                      추천 도서 목록 페이지
GET     /demo/book/list                 추천 도서 목록 페이지
GET     /demo/book/search               검색 도서 목록 페이지
GET     /demo/book/search/{:isbn}       검색 도서 상세 페이지

*/

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children:[
            {
                path:"/sample",
                element:<>
                    <p>자식이다.</p>
                </>
            }
            ,
            {
                path:"/video",
                element:<Child/>,
                children:[
                    {
                        path:"/video/list",
                        element:<VideoList/>
                    }
                    ,
                    {
                        path:"/video/search",
                        element:<VideoList/>
                    }
                ]
            }
            ,
            {
                path:"/book",
                element:<Child/>,
                children:[
                    {
                        path:"/book/search",
                        element:<VideoList/>
                    }
                ]
            }
        ]
    },
], {
    basename: "/demo"
})

export default router;