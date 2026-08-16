import { useEffect, useRef, useState } from "react";
import useTimer from "../hooks/useTimer";
//import type { Dispatch, SetStateAction } from "react";


function TimerPage() {
    {/* hoursというデータを覚える。そのデータを変更するのがsetHours */}
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");

    const [hasStarted, setHasStarted] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const validateInput = () => {
    if (hours === "" || minutes === "" || seconds === "") {
        setErrorMessage("時間・分・秒をすべて入力してください。");
        return false;
    }

    const hourValue = Number(hours);
    const minuteValue = Number(minutes);
    const secondValue = Number(seconds);

    if (hourValue < 0 || hourValue > 99) {
        setErrorMessage("時間は0～99の範囲で入力してください。");
        return false;
    }

    if (minuteValue < 0 || minuteValue > 59) {
        setErrorMessage("分は0～59の範囲で入力してください。");
        return false;
    }

    if (secondValue < 0 || secondValue > 59) {
        setErrorMessage("秒は0～59の範囲で入力してください。");
        return false;
    }

    if (hourValue === 0 && minuteValue === 0 && secondValue === 0) {
        setErrorMessage("1秒以上の時間を設定してください。");
        return false;
    }

    setErrorMessage("");
    return true;
};
    //const alarmSound = new Audio("/alarm.mp3");
    const alarmSound = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        alarmSound.current = new Audio("/alarm.mp3");
    }, []); //TimerPageが最初に表示されたときに1回だけ実行する

    const {remainingSeconds, isRunning, setRemainingSeconds, setIsRunning,} = useTimer();

    {/* 入力された時間を秒に変換する */}
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    {/* タイマーが開始されていて、残り時間が0で、タイマーが動作していない場合に、hasStartedをfalseにする */}
    useEffect(() => {
        if (hasStarted && remainingSeconds === 0 && !isRunning) {
            setHasStarted(false);

            if (alarmSound.current) {
                alarmSound.current.loop = true;
                alarmSound.current.play();
            }
        }
    }, [hasStarted, remainingSeconds, isRunning]);

    const stopAlarm = () => {
        if (alarmSound.current) {
            alarmSound.current.pause();//音を一時停止する
            alarmSound.current.currentTime = 0;//再生位置を最初に戻す
            alarmSound.current.loop = false;//繰り返し再生を解除する
        }
    };

    {/* 残り時間を時分秒に変換する */}
    const displayHours = Math.floor(remainingSeconds / 3600);

    const displayMinutes = Math.floor(
        (remainingSeconds % 3600) / 60
    );

    const displaySeconds = remainingSeconds % 60;

    {/* 2桁表示にする */}
    const formattedHours = String(displayHours).padStart(2, "0");
    const formattedMinutes = String(displayMinutes).padStart(2, "0");
    const formattedSeconds = String(displaySeconds).padStart(2, "0");    
    
    return (
        <main>
            <h2>Timer</h2>
            {/* タイマーの時間を表示するためのdiv要素を追加 残り時間*/}
            <div className="timer-display">
                {/* hoursに値がある？ YES → hoursを使う NO  → "00"を使う */}
                {formattedHours}:{formattedMinutes}:{formattedSeconds}
            </div>

            {/* 時間入力 */}
            {/* タイマーの時間を入力するためのdiv要素を追加 */}
            <div className="timer-input">
                <div>
                    <input
                        //id="hours"
                        //type="number"
                        //min="0"
                        //max="99"
                        type="text"
                        maxLength={2}
                        inputMode="numeric" //理由は、入力値を文字列として扱いやすいからtextにしている。2桁の数字を入力するための設定
                        value={hours}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!/^\d*$/.test(value)) {
                                    return;
                                }
                                if (value !== "" && Number(value) > 99) {
                                    return;
                                }
                                setHours(value);
                        }}
                    />
                    <label htmlFor="hours">時間</label>
                </div>

                <div>
                    <input
                        //id="minutes"
                        //type="number"
                        //min="0"
                        //max="59"
                        type="text"
                        maxLength={2}
                        inputMode="numeric" // 2桁の数字を入力するための設定
                        value={minutes}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!/^\d*$/.test(value)) {
                                return;
                            }
                            if (value !== "" && Number(value) > 59) {
                                return;
                            }
                            setMinutes(value);
                        }}
                    />
                    <label htmlFor="minutes">分</label>
                </div>

                <div>
                    <input
                        //id="seconds"
                        //type="number"
                        //min="0"
                        //max="59"
                        type="text"
                        maxLength={2}
                        inputMode="numeric"
                        value={seconds}
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!/^\d*$/.test(value)) {
                                return;
                            }
                            if (value !== "" && Number(value) > 59) {
                                return;
                            }
                            setSeconds(value);
                        }}
                    />
                    <label htmlFor="seconds">秒</label>
                </div>
            </div>

        {/* ボタンを配置するためのdiv要素を追加 操作ボタン */}
        <div className="button-area">
            <button
                disabled={hasStarted || totalSeconds === 0}
                onClick={() => {
                    setRemainingSeconds(totalSeconds);
                    setHasStarted(true);
                    setIsRunning(true);
                }}
            >
                開始
            </button>

            <button
            disabled={!hasStarted || remainingSeconds === 0}
            onClick={() => {
                setIsRunning(!isRunning);
            }}
            >
                {isRunning ? "一時停止" : "再開"}
            </button>

            <button
                disabled={!hasStarted}
                onClick={() => {
                    stopAlarm();
                    setIsRunning(false);//タイマーを停止する
                    setRemainingSeconds(0);//タイマーを0にする

                    setHours("");
                    setMinutes("");
                    setSeconds("");

                    setHasStarted(false);
                }}
            >
                キャンセル
            </button>

            <button onClick={stopAlarm}>
                アラーム停止
            </button>
        </div>
        </main> 
    );
}

export default TimerPage;

//タイマーそのものを管理する場所ではなく、画面を表示して操作する場所