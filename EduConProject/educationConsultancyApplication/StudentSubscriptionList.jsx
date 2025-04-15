import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const StudentSubscriptionList = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSubscriptionsByStudent()
            .then(response => {
                console.log("Received subscriptions:", response.data);
                if (Array.isArray(response.data)) {
                    setSubscriptions(response.data);
                } else {
                    console.warn("Unexpected response format:", response.data);
                    setSubscriptions([]);
                }
            })
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const returnBack = () => {
        navigate('/StudentMenu');
    };

    const handlePayment = (subscriptionId) => {
        console.log("Initiating payment for subscription:", subscriptionId);
        navigate('/payment-add');
    };

    return (
        <div className="text-center">
            <h2 className="text-center">Subscriptions</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row">
                {subscriptions.length > 0 ? (
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Subscription ID</th>
                                <th>Course ID</th>
                                <th>Subscription Date</th>
                                <th>End Date</th>
                                <th>Installments</th>
                                <th>Installment Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscriptions.map((sub, index) => (
                                <tr key={`sub-${index}`}>
                                    <td>{sub.studentId || "N/A"}</td>
                                    <td>{sub.subscriptionId || "N/A"}</td>
                                    <td>{sub.courseId || "N/A"}</td>
                                    <td>{sub.subscriptionDate ? new Date(sub.subscriptionDate).toLocaleDateString() : "N/A"}</td>
                                    <td>{sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}</td>
                                    <td>{sub.installments || "N/A"}</td>
                                    <td>₹{sub.installmentAmount?.toFixed(2) || "0.00"}</td>
                                    <td>{sub.status || "N/A"}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handlePayment(sub.subscriptionId)}
                                        >
                                            Pay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No subscriptions found.</p>
                )}
                <br />
                <button
                    style={{ marginLeft: "10px" }}
                    onClick={returnBack}
                    className="btn btn-success"
                >
                    Return
                </button>
            </div>
        </div>
    );
};

export default StudentSubscriptionList;
