import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../LoginView.css';
import { generateBillId, savePayment } from '../../Services/PaymentService';
import { getAllSubscriptionsByStudent } from '../../Services/SubscriptionService';

const PaymentAddition = () => {
    const today = new Date();
    const formatDate = (date) => date.toISOString().split('T')[0];

    const [payment, setPayment] = useState({
        billNumber: '',
        subscriptionId: '',
        studentId: '',
        installmentNo: 1, // Default to 1
        amount: 0.0,
        payDate: formatDate(today)
    });

    const [subscriptions, setSubscriptions] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        generateBillId().then(response => {
            setPayment(prev => ({ ...prev, billNumber: response.data }));
        }).catch(error => console.error("Error generating bill number:", error));

        getAllSubscriptionsByStudent().then(response => {
            setSubscriptions(response.data);
        }).catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setPayment(prev => ({ ...prev, [name]: value }));
    };

    const onSubscriptionChange = (event) => {
        const selectedSubscription = subscriptions.find(sub => sub.subscriptionId === event.target.value);
        if (selectedSubscription) {
            setPayment(prev => ({
                ...prev,
                subscriptionId: selectedSubscription.subscriptionId,
                studentId: selectedSubscription.studentId,
                installmentNo: selectedSubscription.installments, // Get installment number
                amount: selectedSubscription.installmentAmount // Get installment amount
            }));
        }
    };

    const paymentSave = (event) => {
        event.preventDefault();

        savePayment(payment)
            .then(() => {
                alert('Payment successfully added!');
                navigate('/StudentMenu');
            })
            .catch(error => {
                alert('Error occurred while saving payment: ' + error);
            });
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-12">
                        <div className="card-body">
                            <h2 className="text-center"><u>New Payment</u></h2>
                            <br />
                            <form>
                                <div className="form-group">
                                    <label>Bill Number:</label>
                                    <input className="form-control" value={payment.billNumber} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Select Subscription:</label>
                                    <select name="subscriptionId" className="form-control" onChange={onSubscriptionChange}>
                                        <option value="">--Select Subscription--</option>
                                        {subscriptions.map(sub => (
                                            <option key={sub.subscriptionId} value={sub.subscriptionId}>
                                                {sub.subscriptionId} - {sub.studentId}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Student ID:</label>
                                    <input className="form-control" value={payment.studentId} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Installment Number:</label>
                                    <input type="number" className="form-control" value={payment.installmentNo} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Amount:</label>
                                    <input className="form-control" value={payment.amount} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Payment Date:</label>
                                    <input className="form-control" value={payment.payDate} readOnly />
                                </div>
                                <br />
                                <button className="btn btn-success" onClick={paymentSave}>Pay</button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={() => navigate('/StudentMenu')}>Return</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentAddition;