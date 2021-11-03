import React, {useState, useEffect} from "react";

const Timer = ({className = '', pause = false, getTime}) => {
    const [second, setSecond] = useState("00");
    const [minute, setMinute] = useState("00");
    const [isActive, setIsActive] = useState(true);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                let computedSecond =
                    String(secondCounter).length === 1
                        ? `0${secondCounter}`
                        : secondCounter;
                let computedMinute =
                    String(minuteCounter).length === 1
                        ? `0${minuteCounter}`
                        : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter((counter) => counter + 1);
                getTime({second, minute});
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter]);
    useEffect(() => {
        if (pause) {
            setIsActive(false);
        }
    }, [pause]);
    useEffect(() => {
        setIsActive(true);
    }, []);

    return (
        <h2 className={className}>{minute}:{second} minute(s)</h2>
    );
};

export default Timer;
