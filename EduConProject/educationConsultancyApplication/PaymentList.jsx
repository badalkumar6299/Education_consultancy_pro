import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../LoginView.css';
import { getAllBills } from '../../Services/PaymentService';

const PaymentList = () => {
    const [payments, setPayments] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        getAllBills()
            .then(response => {
                console.log("Received payments:", response.data);
                setPayments(response.data);
            })
            .catch(error => console.error("Error fetching payments:", error));
    }, []);

    const returnBack = () => {
        navigate('/AdminMenu');
    };

    return (
        <div className="text-center container">
            <h2 className="text-center">Payments</h2>
            <hr style={{ height: "3px", borderWidth: 0, color: "yellow", backgroundColor: "red" }} />
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Bill Number</th>
                                <th>Subscription ID</th>
                                <th>Student ID</th>
                                <th>Installment No</th>
                                <th>Amount</th>
                                <th>Payment Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment, index) => (
                                    <tr key={payment.billNumber || `payment-${index}`}>
                                        <td>{payment.billNumber}</td>
                                        <td>{payment.subscriptionId}</td>
                                        <td>{payment.studentId}</td>
                                        <td>{payment.installmentNo}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>{payment.payDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No payment records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <button style={{ marginLeft: "10px" }} onClick={returnBack} className="btn btn-success">Return</button>
        </div>
    );
};

export default PaymentList;