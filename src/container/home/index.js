import React, {useState, useEffect} from "react";
import faker from 'faker';

import Button from "../../components/Button";

import Table from "../../components/Table";
import Modal from "../../components/Modal";
import Timer from "../../components/Timer";
import SuccessMessageModal from "../../components/Modal/SuccessMessageModal";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedRange, setSelectedRange] = useState(0);
    const [timerValue, setTimerValue] = useState('');
    const [showTimer, setShowTimer] = useState(false);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [peopleList, setPeopleList] = useState([]);


    function generatePeopleList(selectedRange) {
        const people = [];
        for (let i = 0; i < selectedRange; i++) {
            people.push({
                id: faker.datatype.uuid(),
                isChecked: false,
                email: faker.internet.email(),
                potatos: faker.datatype.number({min: 1, max: 1000}),
                tags: faker.lorem.word(),
                fullName: faker.name.findName(),
                location: faker.address.country()
            });
        }
        return people;
    }

    function getElapsedTime(time) {
        let timerVal = time ? `${time.minute}:${time.second}` : '';
        setTimerValue(timerVal);
        return timerVal;
    }

    useEffect(() => {
        setPeopleList(generatePeopleList(selectedRange));
        setShowTimer(selectedRange);
    }, [selectedRange]);
    useEffect(() => {

    }, []);
    return (
        <div>
            <div className="d-flex flex-justify-between flex-items-center">
                <h1>Sorting Training System</h1>
                <div className="d-flex flex-justify-between flex-items-center">
                    {showTimer ? <Timer pause={pauseTimer} className="mr-4" getTime={getElapsedTime}/> : null}
                    <Button text="Start sorting!" type="primary" showModal={showModal} onClick={() => setShowModal(true)}/>
                </div>
            </div>
            <Table people={peopleList} onSorted={() => {
                setPauseTimer(true);
                setShowSuccessModal(true);
            }}/>
            {showModal && <Modal closeModal={() => {
                setShowModal(false);
            }} startTimer={(selectedRange) => {
                setPauseTimer(false);
                setShowTimer(false);
                setSelectedRange(selectedRange);
            }}/>}
            {showSuccessModal && <SuccessMessageModal time={timerValue} closeModal={() => {
                setShowSuccessModal(false);
            }}/>}
        </div>
    );
}
