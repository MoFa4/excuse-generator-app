const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Excuses (same as before, add more if you want!)
const excuses = {
  work: [
    "My dog ate my alarm clock.",
    "Traffic was backed up due to a zombie apocalypse drill.",
    "My coffee machine exploded this morning.",
    "I thought today was Saturday.",
    "I was helping a turtle cross the highway."
  ],
  school: [
    "My homework was abducted by aliens.",
    "The dog really did eat it this time.",
    "My printer only prints in invisible ink.",
    "I left my bag on the bus to Narnia.",
    "Grandma needed help fighting off dragons."
  ],
  meeting: [
    "Got stuck in an infinite Zoom waiting room.",
    "My cat walked across the keyboard and rescheduled everything.",
    "The elevator is on a world tour today.",
    "I was busy saving the world as a superhero.",
    "Ran out of invisible gas in my car."
  ],
  general: [
    "A flock of birds stole my car keys.",
    "Practicing for the Procrastination World Championships.",
    "Time travel accident—just got back from tomorrow.",
    "My socks didn't match, had to restart the day.",
    "The universe is conspiring against me today."
  ]
};

const scenarios = Object.keys(excuses);

// Common styles
const styles = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
    body { 
      font-family: 'Poppins', sans-serif; 
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); 
      min-height: 100vh; 
      margin: 0; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
    }
    .container { 
      background: white; 
      padding: 40px; 
      border-radius: 20px; 
      box-shadow: 0 10px 30px rgba(0,0,0,0.1); 
      text-align: center; 
      max-width: 600px; 
      width: 90%; 
    }
    h1 { color: #333; margin-bottom: 10px; }
    p { color: #666; }
    select, button { 
      padding: 12px 20px; 
      font-size: 16px; 
      border-radius: 10px; 
      margin: 10px; 
    }
    select { border: 2px solid #ddd; }
    button { 
      background: #e74c3c; 
      color: white; 
      border: none; 
      cursor: pointer; 
      transition: 0.3s; 
    }
    button:hover { background: #c0392b; transform: scale(1.05); }
    .excuse { 
      font-size: 2em; 
      font-weight: bold; 
      color: #e74c3c; 
      margin: 30px 0; 
      font-style: italic; 
    }
    a { color: #e74c3c; text-decoration: none; }
    .footer { margin-top: 40px; font-size: 0.9em; color: #999; }
  </style>
`;

// Home page
app.get('/', (req, res) => {
  const randomExcuse = excuses.general[Math.floor(Math.random() * excuses.general.length)];
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Excuse Generator</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h1>🤖 Random Excuse Generator 😂</h1>
        <p>Select a scenario and get the perfect (totally believable) excuse!</p>
        
        <form action="/generate" method="POST">
          <select name="scenario">
            ${scenarios.map(s => `<option value="${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
          </select>
          <button type="submit">Generate Excuse</button>
        </form>
        
        <div class="excuse">"${randomExcuse}"</div>
        <div class="footer"><em>Deployed via Docker + GitHub Actions CI/CD 🚀</em></div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Generate page
app.post('/generate', (req, res) => {
  const scenario = req.body.scenario || 'general';
  const list = excuses[scenario] || excuses.general;
  const excuse = list[Math.floor(Math.random() * list.length)];
  
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Excuse</title>
      ${styles}
    </head>
    <body>
      <div class="container">
        <h1>🤖 Your Perfect Excuse 😂</h1>
        <p><a href="/">← Generate Another</a></p>
        <p><strong>For ${scenario.charAt(0).toUpperCase() + scenario.slice(1)}:</strong></p>
        <div class="excuse">"${excuse}"</div>
        
        <form action="/generate" method="POST">
          <input type="hidden" name="scenario" value="${scenario}">
          <button type="submit">Another One!</button>
        </form>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Enhanced Excuse Generator running at http://localhost:${port}`);
});