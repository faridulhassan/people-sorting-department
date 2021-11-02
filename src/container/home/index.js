import React, {useState, useEffect} from "react";
import faker from 'faker';

import Button from "../../components/Button/index";

import Table from "../../components/Table/index";
import Modal from "../../components/Modal/index";
import Timer from "../../components/Timer/index";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [range, setRange] = useState(0);
    const [resetTimer, setResetTimer] = useState(false);
    const [peopleList, setPeopleList] = useState([]);


    function generatePeopleList(range) {
        const people = [];
        for (let i = 0; i < range; i++) {
            people.push({
                id: faker.datatype.uuid(),
                isChecked: false,
                email: faker.internet.email(),
                potatos: faker.datatype.number({min: 0, max: 1000}),
                tags: faker.lorem.word(),
                fullName: faker.name.findName(),
                location: faker.address.country()
            });
        }
        return people;
    }

    useEffect(() => {
        setPeopleList(generatePeopleList(range));
    }, [range]);
    return (
        <div>
            <div className="d-flex flex-justify-between flex-items-center">
                <h1>Sorting Training System</h1>
                <div className="d-flex flex-justify-between flex-items-center">
                    {range ? <Timer reset={resetTimer} className="mr-4"/> : null}
                    <Button text="Start sorting!" type="primary" showModal={showModal}
                            onClick={() => setShowModal(true)}/>
                </div>
            </div>
            <Table people={peopleList}/>
            {showModal && <Modal closeModal={() => {
                setShowModal(false);
            }} startTimer={(range) => {
                setResetTimer(true);
                setRange(range);
            }}/>}
        </div>
    );
}
