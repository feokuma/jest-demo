import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
    const [tasks, setTasks] = useState<Task[]>();

    async function getTasks() {
        const { data } = await axios.get<Task[]>("http://localhost:5000/tasks");
        setTasks(data);
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>To Do List</h1>
            </header>
            <main className="App-main">
                <ul>
                    {tasks?.map((task) => (
                        <li key={task.id}>{task.name}</li>
                    ))}
                </ul>

                <button onClick={getTasks}>Get tasks</button>
            </main>
        </div>
    );
}

interface Task {
    id: number;
    name: string;
    done: boolean;
}

export default App;
