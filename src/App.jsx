const { useState, useEffect } = React;

const App = () => {
    // Access global components
    const TaskTable = window.TaskTable;
    const TaskModal = window.TaskModal;

    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('sol_spin_tasks');
        if (saved) {
            try {
                setTasks(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse tasks", e);
            }
        }
    }, []);

    // Save to LocalStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('sol_spin_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddClick = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSaveTask = (taskData) => {
        if (editingTask) {
            // Update existing
            setTasks(prev => prev.map(t => t.id === taskData.id ? taskData : t));
        } else {
            // Create new
            setTasks(prev => [...prev, taskData]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="container">
            <header>
                <h1>Task Management</h1>
                <button className="btn" onClick={handleAddClick}>+ Add Task</button>
            </header>

            <TaskTable tasks={tasks} onEdit={handleEditClick} />

            {isModalOpen && (
                <TaskModal
                    task={editingTask}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTask}
                />
            )}
        </div>
    );
};

// Mount the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
