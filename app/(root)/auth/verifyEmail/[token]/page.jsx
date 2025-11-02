import axios from "axios";
import React, { use, useEffect, useState } from "react";

const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verifyEmail = async () => {
      const { data: verificationResponse } = await axios.post(
        "/api/auth/verify-email",
        { token }
      );

      if (verificationResponse.success) {
        setIsVerified(true);
      }
    };
  }, [token]);

  return <div>EmailVerification</div>;
};

export default EmailVerification;
