import React, { useState, useEffect, useParams } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import '../App.css'
const ConfirmationModal = ({ message, id }) => {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [attributeValue, setAttributeValue] = useState("none");
    // const { id } = useParams();

    // const [vote, setVote] = useState(0);

    // const loadUser = async () => {
      
    // };


    // useEffect(() => {
    //     loadUser();
    //   }, []);

    const handleConfirm = async () => {
    const result = await axios.get(`http://localhost:8080/candidate/${id}`);
    let vote = result.data.votes_count
    await axios.put(`http://localhost:8080/candidate/${id}`, {votes_count:vote+1})
    console.log(vote)
    setIsOpen(false);
    navigate('/login')
    };

    return (
    <>
      <button className='vote-option' onClick={() => {setIsOpen(true); setAttributeValue("block");}}></button>
      {isOpen && (
        <div className="modal " style={{display:attributeValue, top:"30px", width:"500px", left:"30%"}}>
          <div className="modal-content confirm-modal">
            <p>{message}</p>
            <div style={{display:"flex", justifyContent:"center"}} >
            <button className='primary-btn' onClick={handleConfirm}>Confirm</button>
            <button className='btn btn-outline-danger' onClick={() => setIsOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
