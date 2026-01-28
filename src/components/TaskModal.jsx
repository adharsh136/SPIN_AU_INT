// Mock Data Options
const USERS = ["Resource A", "Resource B", "Resource C"];
const REQUESTORS = ["Manager X", "Manager Y"];
const PROJECTS = ["Project Alpha", "Project Beta", "Internal Ops"];
const STATUSES = ["Pending", "In Progress", "Completed"];

const { useState, useEffect } = React;

const TaskModal = ({ task, onClose, onSave }) => {
    // Access global components
    const WorkloadManager = window.WorkloadManager;

    // If task is null, we are adding. If set, we are editing.
    const [formData, setFormData] = useState({
        id: crypto.randomUUID(),
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        requestedBy: REQUESTORS[0],
        assignedTo: USERS[0],
        status: STATUSES[0],
        project: PROJECTS[0],
        workloads: []
    });

    useEffect(() => {
        if (task) {
            setFormData(JSON.parse(JSON.stringify(task))); // Deep copy
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="modal-title">{task ? "Edit Task" : "New Task"}</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Task Name</label>
                        <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" className="form-control" value={formData.description || ""} onChange={handleChange} rows="3"></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Start Date</label>
                            <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>End Date</label>
                            <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Project</label>
                            <select name="project" className="form-control" value={formData.project} onChange={handleChange}>
                                {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Status</label>
                            <select name="status" className="form-control" value={formData.status} onChange={handleChange}>
                                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Assigned To</label>
                            <select name="assignedTo" className="form-control" value={formData.assignedTo} onChange={handleChange}>
                                {USERS.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Requested By</label>
                            <select name="requestedBy" className="form-control" value={formData.requestedBy} onChange={handleChange}>
                                {REQUESTORS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                    </div>

                    <WorkloadManager
                        workloads={formData.workloads}
                        onChange={(newWorkloads) => setFormData(prev => ({ ...prev, workloads: newWorkloads }))}
                    />

                    <div className="actions">
                        <button type="button" onClick={onClose} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn">Save Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Make it globally available
window.TaskModal = TaskModal;
