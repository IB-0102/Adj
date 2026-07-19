fetch("https://formsubmit.co/ajax/adjim1990@gmail.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    _subject: "Test Subject",
    name: "John Doe",
    email: "john@example.com",
    message: "This is a test message to see if it's blank"
  })
}).then(res => res.json()).then(console.log).catch(console.error);
