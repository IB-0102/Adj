const fs = require('fs');

let serverCode = fs.readFileSync('server.ts', 'utf8');

const oldFetch = `      try {
        await fetch("https://formsubmit.co/ajax/adjim1990@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Origin": "https://adjim1990-portfolio.com",
            "Referer": "https://adjim1990-portfolio.com/"
          },
          body: JSON.stringify({ name, email, phone, subject, message })
        });
      } catch (e) {
        console.error("Formsubmit error:", e);
      }`;

const newFetch = `      try {
        await fetch("https://formsubmit.co/ajax/adjim1990@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Origin": "https://adjim1990-portfolio.com",
            "Referer": "https://adjim1990-portfolio.com/"
          },
          body: new URLSearchParams({
            _template: "table",
            _subject: subject || "New Contact Message",
            name: name || "",
            email: email || "",
            phone: phone || "",
            message: message || ""
          }).toString()
        });
      } catch (e) {
        console.error("Formsubmit error:", e);
      }`;

serverCode = serverCode.replace(oldFetch, newFetch);
fs.writeFileSync('server.ts', serverCode);
console.log("Replaced!");
