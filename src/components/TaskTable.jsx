const TaskTable = ({ tasks, onEdit }) => {
    if (tasks.length === 0) return <div className="empty-state">No tasks found. Click "Add Task" to create one.</div>;

    return (
        <div className="card">
            <table>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Project</th>
                        <th>Assigned To</th>
                        <th>Duration</th>
                        <th>Workloads</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} onDoubleClick={() => onEdit(task)} title="Double-click to edit">
                            <td style={{ fontWeight: 500 }}>{task.name}</td>
                            <td>{task.project}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.startDate} <span style={{ color: '#94a3b8' }}>to</span> {task.endDate}</td>
                            <td>
                                <span style={{
                                    background: '#e2e8f0',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.8rem'
                                }}>
                                    {task.workloads.length}
                                </span>
                            </td>
                            <td>
                                <span style={{
                                    color: task.status === 'Completed' ? 'green' : task.status === 'In Progress' ? 'orange' : 'grey',
                                    fontWeight: 500
                                }}>
                                    {task.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Make it globally available
window.TaskTable = TaskTable;
