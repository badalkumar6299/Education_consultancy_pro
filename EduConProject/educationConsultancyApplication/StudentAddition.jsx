import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateRegistration, saveStudent } from "../../Services/StudentService";
import { getStudentStatusByUsername } from "../../Services/StudentService";

const StudentAddition = () => {
    const [student, setStudent] = useState({
        registrationNumber: "",
        username: "A",
        studentName: "",
        email: "A",
        mobile: 0,
        address: "",
        studentLevel: "",
        status: "A"
    });
    const [newId, setNewId] = useState("");
    let navigate = useNavigate();

    const checkStatus = () => {
        getStudentStatusByUsername().then(response => {
            if (response.data === true || response.data === false) {
                alert("Student is already registered....");
                navigate("/StudentMenu");
            } else {
                showStudentId();
            }
        });
    };

    const showStudentId = () => {
        generateRegistration().then((response) => {
            setNewId(response.data);
        });
    };

    useEffect(() => {
        checkStatus();
    }, []);

    const onChangeHandler = (event) => {
        event.persist();
        const { name, value } = event.target;
        setStudent(values => ({ ...values, [name]: value }));
    };

    const studentSave = (event) => {
        event.preventDefault();
        student.registrationNumber = newId;
        saveStudent(student).then(response => {
            alert("New Student is registered");
            navigate('/StudentMenu');
        });
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-12 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <h2 className="text-center"><u>Student Registration</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Registration Number: </label>
                                    <input placeholder="Registration Number" name="registrationNumber" className="form-control" value={newId} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Username: </label>
                                    <input placeholder="Username" name="username" className="form-control" value={student.username} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Student Name: </label>
                                    <input placeholder="Student Name" name="studentName" className="form-control" value={student.studentName} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input placeholder="Email" name="email" className="form-control" value={student.email} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Mobile: </label>
                                    <input placeholder="Mobile" name="mobile" className="form-control" value={student.mobile} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Address: </label>
                                    <input placeholder="Address" name="address" className="form-control" value={student.address} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Student Level: </label>
                                    <input placeholder="Student Level" name="studentLevel" className="form-control" value={student.studentLevel} onChange={onChangeHandler} />
                                </div>
                                <div className="form-group">
                                    <label>Status: </label>
                                    <input placeholder="Status" name="status" className="form-control" value={student.status} onChange={onChangeHandler} />
                                </div>
                                <button className="btn btn-success" onClick={studentSave}>Save</button>
                                &nbsp;
                                <button className="btn btn-secondary" onClick={() => navigate('/StudentMenu')}>Return</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentAddition;