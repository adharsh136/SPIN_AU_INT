const WorkloadManager = ({ workloads, onChange, taskStartDate, taskEndDate }) => {
    const addWorkload = () => {
        onChange([...workloads, { id: crypto.randomUUID(), startDate: "", endDate: "" }]);
    };

    const updateWorkload = (index, field, value) => {
        const updated = [...workloads];
        updated[index][field] = value;
        onChange(updated);
    };

    const removeWorkload = (index) => {
        const updated = workloads.filter((_, i) => i !== index);
        onChange(updated);
    };

    return (
        <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <label>Workloads</label>
                <button type="button" onClick={addWorkload} className="btn btn-small btn-outline">+ Add</button>
            </div>

            <div className="workload-list">
                {workloads.length === 0 && <div className="text-muted" style={{ fontSize: '0.9rem' }}>No workloads added.</div>}
                {workloads.map((wl, idx) => (
                    <div key={wl.id} className="workload-item">
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.75rem' }}>Start</label>
                            <input
                                type="date"
                                className="form-control"
                                value={wl.startDate}
                                min={taskStartDate}
                                max={taskEndDate}
                                onChange={(e) => updateWorkload(idx, 'startDate', e.target.value)}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.75rem' }}>End</label>
                            <input
                                type="date"
                                className="form-control"
                                value={wl.endDate}
                                min={wl.startDate || taskStartDate}
                                max={taskEndDate}
                                onChange={(e) => updateWorkload(idx, 'endDate', e.target.value)}
                            />
                        </div>
                        <button type="button" onClick={() => removeWorkload(idx)} className="btn btn-danger btn-small">×</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Make it globally available
window.WorkloadManager = WorkloadManager;
