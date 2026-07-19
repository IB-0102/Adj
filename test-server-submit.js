fetch("https://formsubmit.co/adjim1990@gmail.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    _captcha: "false",
    _template: "table",
    name: "Server Test Name",
    email: "test@example.com",
    subject: "Server Test Subject",
    message: "This is a server test using URL encoded to the normal endpoint."
  }).toString()
}).then(res => {
  console.log("Status:", res.status);
  return res.text();
}).then(text => console.log("Response:", text.substring(0, 100))).catch(console.error);
