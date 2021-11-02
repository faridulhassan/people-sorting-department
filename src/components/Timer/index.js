import React, {useEffect, useState} from 'react';

const Timer = ({className = ''}) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let myInterval;

    function zerePrefix(timeUnit) {
        return timeUnit < 10 ? `0${timeUnit}` : timeUnit;
    }

    useEffect(() => {
        myInterval = setInterval(() => {

            setSeconds(seconds + 1);
            if (seconds === 59) {
                setSeconds(0);
                setMinutes(minutes + 1);
                if (minutes === 59) {
                    setMinutes(0);
                    setHours(hours + 1);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            <h2 className={className}> {zerePrefix(hours)}:{zerePrefix(minutes)}:{zerePrefix(seconds)}</h2>
        </div>
    );
};

export default Timer;
