import React, {useState, useEffect, useRef} from "react";
import Button from "../Button";

import "./style.scss";

export default function Modal({width = "450px", closeModal, startTimer}) {
    const min = 20,
        max = 100;
    const [range, setRange] = useState(min),
        [isInvalidStatus, setIsInvalidStatus] = useState(false);
    const modalElRef = useRef(null);
    const inputRangeElRef = useRef(null);

    const body = document.body;
    body.classList.add("overflow-hidden");

    let timeoutId;

    function validateRange() {
        let isValid = false,
            {min, max, value} = inputRangeElRef.current;
        if (value >= +min && value <= +max) {
            isValid = true;
        }
        return isValid;
    }

    function handleClose(delay = 150) {
        timeoutId = window.setTimeout(() => {
            closeModal();
        }, delay);
    }

    useEffect(() => {
        setIsInvalidStatus(!validateRange());
    }, [range]);
    useEffect(() => {
        modalElRef.current.classList.add('fade-in');
        return () => {
            window.clearTimeout(timeoutId);
            body.classList.remove("overflow-hidden");
        };
    }, []);
    return (
        <div className="modal" ref={modalElRef}>
            <div className="modal__box" style={{width: width}}>
                <header className="modal__header d-flex flex-justify-between flex-items-start">
                    <h3 className="modal__header-title">How many people?</h3>
                    <button className="modal__close" onClick={handleClose}>
                        ✖
                    </button>
                </header>
                <section className="modal__body">
                    <p className="mb-3">Enter a number of how many people you want to add to the list.</p>
                    <input ref={inputRangeElRef} type="number" min={min} max={max} className="input-range" value={range}
                           onChange={(e) => setRange(e.target.value ? e.target.value : e.target.value)}/>
                    <p className="error-msg mt-1">{isInvalidStatus ? `Please enter a valid range between ${min} to ${max}!` :
                        <span className="text-transparent">ok</span>}</p>
                </section>
                <footer className="modal__footer d-flex flex-justify-end">
                    <Button text="Cancel" className="mr-3" onClick={handleClose}/>
                    <Button
                        text="Start"
                        type="primary"
                        onClick={() => {
                            if (validateRange()) {
                                startTimer(range);
                                closeModal();
                            }
                        }}
                    />
                </footer>
            </div>
        </div>
    );
}
