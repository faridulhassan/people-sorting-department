import React, {useEffect, useRef} from "react";
import Button from "../Button";

import "./style.scss";

export default function SuccessMessageModal({width = "450px", closeModal, time}) {
    const modalElRef = useRef(null);

    const body = document.body;
    body.classList.add("overflow-hidden");

    let timeoutId;


    function handleClose(delay = 150) {
        timeoutId = window.setTimeout(() => {
            closeModal();
        }, delay);
    }

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
                    <h3 className="modal__header-title">Congratulations!</h3>
                    <button className="modal__close" onClick={handleClose}>
                        ✖
                    </button>
                </header>
                <section className="modal__body">
                    <p className="mb-3">You have successfully sorted the people from the most potatoes at the top to the least potatoes at the bottom within <b>{time} minute(s).</b></p>
                </section>
                <footer className="modal__footer d-flex flex-justify-end">
                    <Button text="Close" className="mr-3" onClick={handleClose}/>
                </footer>
            </div>
        </div>
    );
}
