import React, { useState } from "react";
import './BankLogin.css';

const BankLogin = () => {
  const [bank, setBank] = useState("");

  const handleAuthorize = async () => {
    if (!bank) {
      alert("Please select a bank");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/create-consent/?bank_name=${bank}`, {
        method: "POST",
      });
      const data = await response.json();
      const consentId = data.consent_id;

      // Redirect to authorization URL
      localStorage.setItem('bank_name', bank);
      window.location.href = `http://127.0.0.1:8000/authorize/?bank_name=${bank}&consent_id=${consentId}`;
    } catch (error) {
      console.error("Error creating consent:", error);
    }
  };

  return (
    <div>
      <h1>Bank Authorization</h1>
      <select value={bank} onChange={(e) => setBank(e.target.value)}>
        <option value="">Select a bank</option>
        <option value="NatWest">NatWest</option>
        <option value="RBS">RBS</option>
      </select>
      <button onClick={handleAuthorize}>Authorize</button>
    </div>
  );
};

export default BankLogin;
