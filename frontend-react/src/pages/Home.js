import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../layout/ConfirmationModal";
import CRP from '../Images/CRP.png';
import GHP from '../Images/GHP.png';
import LC from '../Images/LC.png';
import PUP from '../Images/PUP.png';
import SJP from '../Images/SJP.png';
import UAP from '../Images/UAP.png';

export default function Home() {
  const [voteList, setVoteList] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/candidates");
    setVoteList(result.data);
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="header-text" >E VOTING PORTAL - ECI</div>
        <table className="table border shadow">
          <thead>
              <tr>
              <th>S NO.</th>
              <th>SYMBOL</th>
              <th>PARTY</th>
              <th>CANDIDATE NAME</th>
              <th>VOTE</th></tr>
          </thead> 
          <tbody>
            {voteList.map((item, key) =>{
                return (
                    
                    <tr key={item.id}>
                        <td>{key+1}</td>
                        <td><img src={item.symbol_img} alt='symbol' /></td>
                        <td>{item.party_name}</td>
                        <td>{item.candidate_name}</td>
                        <td><ConfirmationModal id={item.id} message= {`You have selected ${item.candidate_name} of the  ${item.party_name} as your vote for the Presidential Election 2023. This action cannot be undone.`} /></td>
                    </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
