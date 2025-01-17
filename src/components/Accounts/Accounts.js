import React, { useEffect, useState } from 'react';
import './Accounts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Accounts() {
  const [accountData, setAccountData] = useState(null);
  const navigate = useNavigate();
  const bankName = localStorage.getItem('bank_name');

  useEffect(() => {
    if (bankName) {
      getAccounts(bankName);
    }
  }, [bankName]);

  const getAccounts = async (bank) => {
    try {
      const access_token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/accounts', {
        params: { access_token, bank },
      });
      setAccountData(response.data);
    } catch (error) {
      console.error("Get accounts error:", error);
    }
  };

  const handleViewDetails = (accountId) => {
    localStorage.setItem('accountId', accountId);
    navigate('/account_details', {state: {'bank_name': bankName}});
  };

  return (
    <div className="accounts-container">
      <h1 className="heading-main">{bankName || "Bank Name"}</h1>
      <p className="last-login">Last login: 7 January 25 (7:44 PM)</p>

      <h2 className="section-title">Transfer between your accounts</h2>
      {accountData && accountData.Data.Account.map((account, index) => (
        <div className="account-card" key={index}>
          <div className="account-info">
            <h3 className="account-name">{account.AccountSubType}</h3>
            <p className="account-details">
              {account.Account[0]?.SchemeName}, {account.Account[0]?.Identification}
            </p>
            <p className="account-name">{account.Account[0]?.Name}</p>
            <table>
              <tbody>
                <tr><th>Account Id</th><td>{account.AccountId}</td></tr>
                <tr><th>Account Type</th><td>{account.AccountType}</td></tr>
                <tr><th>Currency</th><td>{account.Currency}</td></tr>
                <tr><th>Description</th><td>{account.Description}</td></tr>
                <tr><th>Nickname</th><td>{account.Nickname}</td></tr>
                <tr><th>Scheme Name</th><td>{account.Account[0]?.SchemeName}</td></tr>
              </tbody>
            </table>
          </div>
          <div className="account-actions">
            <button onClick={() => handleViewDetails(account.AccountId)}>View Details</button>
          </div>
        </div>
      ))}
    </div>
  );
}
