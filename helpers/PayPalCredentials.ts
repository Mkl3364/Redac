export async function generateAccessToken() {

    const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET).toString("base64")
    const base = "https://api-m.sandbox.paypal.com";
  
    const response = await fetch(`${base}/v1/oauth2/token`, {
  
      method: "post",
  
      body: "grant_type=client_credentials",
  
      headers: {
  
        Authorization: `Basic ${auth}`,
  
      },
  
    });
  
    const data = await response.json();
  
    return data.access_token;
  
  }