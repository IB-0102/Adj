fetch("https://formsubmit.co/ajax/adjim1990@gmail.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json",
    "Origin": "https://adjim1990-portfolio.com",
    "Referer": "https://adjim1990-portfolio.com/"
  },
  body: new URLSearchParams({
    name: "Server Test URL",
    email: "test@test.com",
    phone: "123",
    subject: "Hello",
    message: "This is a URL encoded test"
  }).toString()
}).then(res => res.json()).then(console.log).catch(console.error);
