import { useEffect, useState } from "react";

import Header from "./components/Header.tsx";
import TabMenu from "./components/TabMenu.tsx";
import TimerPage from "./pages/TimerPage.tsx";
import AlarmPage from "./pages/AlarmPage.tsx";
import StopwatchPage from "./pages/StopwatchPage.tsx";

function App() {
    // 現在表示しているページの状態を管理するためのuseStateフックを使用
    //「今どの画面を表示しているのか？」
    const [currentPage, setCurrentPage] = useState("timer");
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
    if (!isRunning) {
        return;
    }

    const timer = setInterval(() => {
        setRemainingSeconds((prev) => {
            if (prev <= 1) {
                setIsRunning(false);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => {
        clearInterval(timer);
    };
}, [isRunning]);

    return (
        <>
            <Header />
            <TabMenu
                currentPage = {currentPage}
                onChange = {setCurrentPage}
            />
            {currentPage === "timer" && <TimerPage 
                remainingSeconds={remainingSeconds} 
                setRemainingSeconds={setRemainingSeconds}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
            />}
            {currentPage === "alarm" && <AlarmPage />}
            {currentPage === "stopwatch" && <StopwatchPage />}
        </>     
    );
}

export default App;