import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse the hash fragment
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // Remove the `#`
    const code = hashParams.get("code");
    const idToken = hashParams.get("id_token");
    const bank = localStorage.getItem("bank_name");

    if (!bank) {
      console.error("Bank name not found in localStorage");
      return;
    }

    if (code) {
      console.log("Authorization Code:", code);
      console.log("ID Token:", idToken);
      console.log("Bank_name:", bank)

      // Send the code to the backend to exchange for an access token
      axios
        .post(
          `http://127.0.0.1:8000/exchange-token?code=${code}&bank_name=${bank}`
        )
        .then((response) => {
          console.log("Access Token:", response.data.access_token);
          localStorage.setItem('access_token', response.data.access_token)
          navigate("/accounts", );
        })
        .catch((error) => {
          console.error("Token exchange failed:", error);
        });
    } else {
      console.error("Authorization code not found in URL");
    }
  }, [navigate]);

  return <div>Processing authorization...</div>;
};

export default Callback;
