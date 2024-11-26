import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CRP from "../Images/CRP.png";
import GHP from "../Images/GHP.png";
import LC from "../Images/LC.png";
import PUP from "../Images/PUP.png";
import SJP from "../Images/SJP.png";
import UAP from "../Images/UAP.png";

export default function Home() {
  const [voteList, setVoteList] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // Mock data for candidates (Replace this with your API call if needed)
    const mockData = [
      { id: 1, symbol_img: CRP, party_name: "CRP", candidate_name: "John Doe" },
      { id: 2, symbol_img: GHP, party_name: "GHP", candidate_name: "Alice Smith" },
      { id: 3, symbol_img: LC, party_name: "LC", candidate_name: "Michael Brown" },
      { id: 4, symbol_img: PUP, party_name: "PUP", candidate_name: "Sophia Johnson" },
      { id: 5, symbol_img: SJP, party_name: "SJP", candidate_name: "William Lee" },
      { id: 6, symbol_img: UAP, party_name: "UAP", candidate_name: "Emma Davis" },
    ];
    setVoteList(mockData);
    // Uncomment the following when the API is ready
    // const result = await axios.get("http://localhost:8080/candidates");
    // setVoteList(result.data);
  };

  const handleVoteChange = (candidateId) => {
    setSelectedCandidate(candidateId);
  };

  const handleSubmitVote = () => {
    if (selectedCandidate) {
      alert(`You have voted for candidate ID: ${selectedCandidate}`);
      // Add logic here to send the vote to the backend
    } else {
      alert("Please select a candidate before submitting your vote.");
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="header-text">E VOTING PORTAL - ECI</div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th>S NO.</th>
              <th>SYMBOL</th>
              <th>PARTY</th>
              <th>CANDIDATE NAME</th>
              <th>VOTE</th>
            </tr>
          </thead>
          <tbody>
            {voteList.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.symbol_img}
                    alt="symbol"
                    style={{ height: "50px", width: "50px" }}
                  />
                </td>
                <td>{item.party_name}</td>
                <td>{item.candidate_name}</td>
                <td>
                  <input
                    type="radio"
                    name="vote"
                    value={item.id}
                    onChange={() => handleVoteChange(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary mt-3" onClick={handleSubmitVote}>
          Submit Vote
        </button>
      </div>
    </div>
  );
}
