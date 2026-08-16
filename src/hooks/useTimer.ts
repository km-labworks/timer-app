import { useEffect, useState } from "react";

function useTimer() {
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    {/* タイマーが動作中かどうかを管理するための状態を追加  false=停止, true=動作中 */}
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        /* setInterval = 決めた時間ごとに繰り返し処理する*/
        const timerId = setInterval(() => {
            setRemainingSeconds((currentSeconds) => { 
                if (currentSeconds <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return currentSeconds - 1;
            });
        }, 1000);
        return () => { clearInterval(timerId); //タイマー終了
        };
    }, [isRunning]);
        return {
        remainingSeconds,
        isRunning,
        setRemainingSeconds,
        setIsRunning,
    };
}

export default useTimer;