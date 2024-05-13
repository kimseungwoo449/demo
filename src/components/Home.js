import React, { useState } from 'react';

const Home = ({style}) => {
    // State : Component에 제공하는 상태 값
    // ㄴ 화면 랜더링에 영향을 준다
    const [count,setCount] = useState(1);
    // useState는 생성자 , count는 getter, setCount는 setter로 생각하자
    console.log(count);
    // 두번씩 콘솔에 찍히는 것은 <React.StrictMode> 때문

    const countUp = (e)=>{
        // console.log(e.target);
        setCount(count+1); // setter
    }

    return (
        <>
            <button style={style} onClick={countUp}>{count}</button>
        </>
    );
};

export default Home;