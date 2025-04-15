import axios from 'axios';

const SUBS_URL="http://localhost:9696/edu-con/subscription";
const ID_URL="http://localhost:9696/edu-con/subscription-id";
const CURRENT_URL="http://localhost:9696/edu-con/subscription-current";
const STUD_URL="http://localhost:9696/edu-con/subscription-stud";


export const saveSubscription = (subscription) => {
    return axios.post(SUBS_URL, subscription);
}

export const updateSubscription = (subscription) => {
    return axios.put(SUBS_URL,subscription);
}

export const getAllSubscriptions = () => {
    return axios.get(SUBS_URL);
}

export const getSubscriptionById = (id) => {
    return axios.get(SUBS_URL+ '/' + id);
}

export const generateSubscriptionId = () => {
    return axios.get(ID_URL);
}
export const getCurrentSubscriptions = () => {
    return axios.get(CURRENT_URL);
}
export const getAllSubscriptionsByStudent = () => {
    return axios.get(STUD_URL);
}
export const getSubscriptionsByStudent = (id) => {
    return axios.get(STUD_URL+ '/' + id);
}