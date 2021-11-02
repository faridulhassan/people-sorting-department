import React, {useState, useEffect, useRef} from "react";
import Sortable from 'sortablejs';

import "./style.scss";

export default function Table({people = []}) {
    const [peoplesList, setPeoplesList] = useState(people);
    const tbodyElRef = useRef(null);
    let sortable;

    useEffect(() => {
        sortable && sortable.destroy();
        sortable = Sortable.create(tbodyElRef.current, {
            onEnd: function (event) {
                const {oldIndex, newIndex} = event;
                if (oldIndex !== newIndex) {
                    updatePeopleDataOnDragEnd(oldIndex, newIndex);
                }

            },
        });
        if (checkIsPeopleSortedByPotatos()) {
            sortable && sortable.destroy();
            console.log('yes sorted');
        } else {
            console.log('not sorted yet!');
        }
        return () => {
            sortable.destroy();
        };
    }, [peoplesList]);
    useEffect(() => {
        setPeoplesList(people);
    }, [people]);

    function checkIsPeopleSortedByPotatos() {
        if (!peoplesList.length) {
            return false;
        }
        let isSorted = true;
        for (let i = 0; i < peoplesList.length; i++) {
            let current = peoplesList[i],
                next = peoplesList[i + 1];
            if (next && (current.potatos < next.potatos)) {
                isSorted = false;
                break;
            }
        }
        return isSorted;
    }

    function updatePeopleDataOnDragEnd(oldIndex, newIndex) {
        let clonePeopleList = peoplesList.slice();
        clonePeopleList.splice(newIndex, 0, clonePeopleList.splice(oldIndex, 1)[0]);
        setPeoplesList(clonePeopleList);
    }

    function handleSelection(id, checked) {
        let people = peoplesList.map(item => {
            if (item.id == id) {
                item.isChecked = checked;
            }
            return item;
        });
        setPeoplesList(people);
    }

    return (
        <div className="dnd-table-wrapper mt-9">
            <div className="dnd-table-header d-flex flex-justify-end">
                <h3 className="total-counter">{peoplesList.length} people in the list</h3>
            </div>
            <div className="table-responsive-wrapper">
                <div className="table-responsive">
                    <table className="border-collapse border w-full dnd-table table-fixed">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Potatoes</th>
                            <th>Tags</th>
                            <th>Full name</th>
                            <th>Location</th>
                        </tr>
                        </thead>
                        <tbody ref={tbodyElRef}>
                        {peoplesList.map(({id, isChecked, email, potatos, tags, fullName, location}, index) => {
                            return (
                                <tr /*draggable onDragStart={onDrageStart} onDrag={onDrag} onDragEnd={onDragEnd}
                                    onDragEnter={onDragEnter} onDragOver={onDragOver}*/ key={id} id={`row-${id}`}
                                                                                        className={isChecked ? ' checked ' : ''}>
                                    <td>
                                        <div className="d-flex flex-items-center">
                                            <input type="checkbox" id={`isChecked-${id}`} className="checkbox"
                                                   onChange={(event) => handleSelection(id, event.target.checked)}/>
                                            <label htmlFor={`isChecked-${id}`}
                                                   className="isCheckedLabel d-flex flex-items-center">
                                                <span/>
                                                {email}
                                            </label>
                                            <span className="right-arrow"/>
                                        </div>
                                    </td>
                                    <td>{potatos}</td>
                                    <td><span className="tags">{tags}</span></td>
                                    <td>{fullName}</td>
                                    <td>{location}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
