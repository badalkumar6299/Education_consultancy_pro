import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { getCurrentStudents } from '../../Services/StudentService';

const StudentCurrent = () => {
    const [students, setStudents] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getCurrentStudents()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
            });
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="text-center">
            <h2 className="text-center text-primary">Current Students-List</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Registration Number</th>
                            <th>User Name</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Address</th>
                            <th>Student Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.registrationNumber || "N/A"}</td>
                                    <td>{student.username || "N/A"}</td>
                                    <td>{student.studentName || "N/A"}</td>
                                    <td>{student.email || "N/A"}</td>
                                    <td>{student.mobile || "N/A"}</td>
                                    <td>{student.address || "N/A"}</td>
                                    <td>{student.studentLevel || "N/A"}</td>
                                    <td>{student.status ? "Active" : "Inactive"}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No student data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn btn-danger" onClick={returnBack}>Back</button>
        </div>
    );
};

export default StudentCurrent;