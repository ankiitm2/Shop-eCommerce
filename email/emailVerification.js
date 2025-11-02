export const emailVerificationLink = (link) => {
  const html = `
   <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    "
  >
    <table
      role="presentation"
      style="width: 100%; border-collapse: collapse; background-color: #f5f5f5"
    >
      <tr>
        <td align="center" style="padding: 40px 20px">
          <table
            role="presentation"
            style="
              max-width: 600px;
              width: 100%;
              border-collapse: collapse;
              background-color: #ffffff;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  padding: 25px 40px 20px;
                  text-align: center;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 12px 12px 0 0;
                "
              >
                
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 600;
                    letter-spacing: -0.5px;
                  "
                >
                  Verify Your Email
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding: 40px">
                <p
                  style="
                    margin: 0 0 20px;
                    color: #333333;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Welcome! Thank you for creating an account with us.
                </p>
                <p
                  style="
                    margin: 0 0 30px;
                    color: #666666;
                    font-size: 15px;
                    line-height: 1.6;
                  "
                >
                  To complete your registration and start using your account,
                  please verify your email address by clicking the button below:
                </p>

                <!-- Button -->
                <table
                  role="presentation"
                  style="width: 100%; border-collapse: collapse"
                >
                  <tr>
                    <td align="center" style="padding: 10px 0 30px">
                      <a
                        href="${link}"
                        style="
                          display: inline-block;
                          padding: 16px 40px;
                          background: linear-gradient(
                            135deg,
                            #667eea 0%,
                            #764ba2 100%
                          );
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                          font-size: 16px;
                          font-weight: 600;
                          letter-spacing: 0.5px;
                          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                          transition: transform 0.2s;
                        "
                      >
                        Verify Email Address
                      </a>
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin: 0 0 10px;
                    color: #666666;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Or copy and paste this link into your browser:
                </p>
                <div
                  style="
                    padding: 12px;
                    background-color: #f8f9fa;
                    border-radius: 6px;
                    border: 1px solid #e9ecef;
                    word-break: break-all;
                  "
                >
                  <a
                    href="${link}"
                    style="
                      color: #667eea;
                      text-decoration: none;
                      font-size: 13px;
                    "
                    >${link}</a
                  >
                </div>

                <p
                  style="
                    margin: 30px 0 0;
                    padding-top: 30px;
                    border-top: 1px solid #e9ecef;
                    color: #999999;
                    font-size: 13px;
                    line-height: 1.5;
                  "
                >
                  <strong>Note:</strong> This verification link will expire in
                  24 hours. If you didn't create an account, you can safely
                  ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  padding: 30px 40px;
                  background-color: #f8f9fa;
                  border-radius: 0 0 12px 12px;
                  text-align: center;
                "
              >
                <p style="margin: 0 0 10px; color: #999999; font-size: 13px">
                  Need help? Contact our support team
                </p>
                <p style="margin: 0; color: #bbbbbb; font-size: 12px">
                  © ${new Date().getFullYear()} Your Company. All rights
                  reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;

  return html;
};
