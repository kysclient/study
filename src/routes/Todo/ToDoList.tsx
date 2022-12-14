import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {Categories, categoryState, toDoAtom, toDoSelector} from "../../atoms/todo-atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";


function ToDoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event : React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>

            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            <CreateToDo/>
            {
                toDos?.map(toDo => <ToDo key={toDo.id} {...toDo} />)
            }
        </div>
    )
}

export default ToDoList;