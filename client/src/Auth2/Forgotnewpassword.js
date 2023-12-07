import React from "react";
import "./Forgotnewpassword.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
function Forgotnewpassword() {
  return (
    <div class="fgnp-bgcontainer">
      <div class="fgnp-cardcontainer">
        <div class="fgnparrow">
          <AiOutlineArrowLeft></AiOutlineArrowLeft>
        </div>
        <h1 class="fgnpheadername">Forgot Password</h1>
        <p class="fgnppara">
          Set your new password to login into your account!
        </p>
        <div className="fgnp-field fgnp-input-field">
          <label>Enter New password</label>
          <input type="email" placeholder="......" className="input" />
        </div>
        <div className="fgnp-field fgnp-button-field">
          <button class="button">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default Forgotnewpassword;
