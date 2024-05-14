// JSX
// ㄴ JavaScript XML

import { RouterProvider } from "react-router-dom";
import VideoList from "./components/VideoList";
import MyComponent from "./components/MyComponent";
import router from "./router";

function App() {  // 함수형으로 정의된 리액트 컴포넌트
  return (
    // <MyComponent message={"This is my first React App.2"} />
    <RouterProvider router={router} />
    //<BookList/>
  );
}

export default App;
