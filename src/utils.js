import axios from "axios";

const getNotes = () => {
    return axios.get("https://easysend-fe-intermediate-exam-621af48a54d0.herokuapp.com/api/document/tami2");
}

const saveNotes = (notes) => {
    return axios.put("https://easysend-fe-intermediate-exam-621af48a54d0.herokuapp.com/api/document/tami2", notes);
}

const utils = { getNotes, saveNotes }
export default utils;