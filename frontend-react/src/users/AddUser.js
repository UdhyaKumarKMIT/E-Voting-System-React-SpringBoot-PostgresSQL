import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    votersID: "",
    aadhar: "",
    otp_num: "",
  });

  const { votersID, aadhar, otp_num } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/user", user);
    navigate("/vote/"+result.data.id);
  };

  const verify = (e) => {
    let el = document.getElementById("voters-id")
    let value = el.value
    console.log(value.length)
    if(value.length!=16) {
      el.classList.add("error-field")
      document.getElementById("aadhar-field").setAttribute("disabled",true)
    }
  }
  const verifyAadhar = (e) => {
    let el = document.getElementById("aadhar-field")
    let value = el.value
    console.log(value.length)
    if(value.length!=16) {
      el.classList.add("error-field")
      document.getElementById("otp-field").setAttribute("disabled",true)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">LOGIN</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3" id="voter-id-parent">
              <label htmlFor="Name" className="form-label">
                VOTERS ID
              </label>
              <div className="field">
              <input
                type={"text"}
                className="form-control"
                id="voters-id"
                placeholder="Enter your voters id"
                name="votersID"
                value={votersID}
                onChange={(e) => onInputChange(e)}
              /><input type="button"  className='primary-btn' value="Verify ID" onClick={(e)=>{document.getElementById("aadhar-field").removeAttribute("disabled"); verify(e)}}/></div>
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                AADHAR NUMBER
              </label>
              <div className="field"><input
                type={"text"}
                className="form-control"
                id="aadhar-field"
                placeholder="Enter your aadhar"
                name="aadhar"
                value={aadhar}
                onChange={(e) => onInputChange(e)}
                disabled
              /><input type="button"  className='primary-btn' value="Send OTP" onClick={(e)=>{document.getElementById("otp-field").removeAttribute("disabled"); verifyAadhar(e)}}/></div>
            </div>
            <div className="mb-3">
              <label htmlFor="otp_num" className="form-label">
                OTP
              </label>
              <div className="field"><input
                type={"text"}
                className="form-control"
                id="otp-field"
                placeholder="Enter OTP"
                name="otp_num"
                value={otp_num}
                onChange={(e) => onInputChange(e)}
                disabled
              /><input type="button" className='primary-btn' value="Verify OTP" onClick={(e)=>{document.getElementById("submit-btn").removeAttribute("disabled")}}/></div>
            </div>
            <button type="submit" className="btn btn-outline-primary" id="submit-btn" disabled>
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
