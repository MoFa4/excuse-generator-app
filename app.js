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
    @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=Poppins:wght@400;600&display=swap');
    body { 
      font-family: 'Poppins', sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      min-height: 100vh; 
      margin: 0; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      color: #333;
    }
    .container { 
      background: rgba(255, 255, 255, 0.95); 
      padding: 50px; 
      border-radius: 30px; 
      box-shadow: 0 20px 40px rgba(0,0,0,0.2); 
      text-align: center; 
      max-width: 700px; 
      width: 90%; 
      backdrop-filter: blur(10px);
    }
    h1 { 
      font-family: 'Comic Neue', cursive; 
      font-size: 3em; 
      color: #ff6b6b; 
      margin-bottom: 20px; 
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }
    p { color: #555; font-size: 1.2em; }
    select { 
      padding: 15px 25px; 
      font-size: 18px; 
      border-radius: 15px; 
      border: 3px solid #ff6b6b; 
      margin: 20px 10px;
      background: white;
    }
    button { 
      padding: 18px 40px; 
      font-size: 20px; 
      border-radius: 50px; 
      background: linear-gradient(45deg, #ff6b6b, #ee5a52); 
      color: white; 
      border: none; 
      cursor: pointer; 
      transition: all 0.3s; 
      box-shadow: 0 10px 20px rgba(255,107,107,0.3);
      font-weight: bold;
    }
    button:hover { 
      transform: translateY(-5px) scale(1.05); 
      box-shadow: 0 15px 30px rgba(255,107,107,0.4);
    }
    .excuse { 
      font-size: 2.5em; 
      font-weight: bold; 
      color: #4ecdc4; 
      margin: 40px 0; 
      font-style: italic; 
      text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
      padding: 20px;
      background: rgba(78, 205, 196, 0.1);
      border-radius: 20px;
    }
    a { color: #ff6b6b; text-decoration: none; font-weight: bold; }
    .footer { margin-top: 50px; font-size: 1em; color: #aaa; }
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

// Generate page (POST)
app.post('/generate', (req, res) => {
  try {
    const scenario = req.body.scenario || 'general';
    const list = excuses[scenario] || excuses.general;
    if (list.length === 0) throw new Error('No excuses available');

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
          <div class="footer"><em>Deployed via Docker + GitHub Actions CI/CD 🚀</em></div>
        </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    console.error('Error in /generate:', error);
    res.status(500).send(`
      <div style="text-align:center; margin-top:100px; font-family:Arial;">
        <h1>😱 Oops! Something went wrong</h1>
        <p>Try again or go back home.</p>
        <a href="/" style="color:#ff6b6b; font-size:1.5em;">← Back to Generator</a>
      </div>
    `);
  }
});

// Prevent "Cannot GET /generate" when sharing result links
app.get('/generate', (req, res) => {
  res.redirect('/');
});

// 404 handler
app.use((req, res) => {
  res.status(404).send(`
    <div style="text-align:center; margin-top:100px; font-family:Arial;">
      <h1>404 - Page Not Found</h1>
      <p><a href="/" style="color:#ff6b6b; font-size:1.5em;">← Back to Excuse Generator</a></p>
    </div>
  `);
});

// Global error handler (must be BEFORE app.listen!)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send(`
    <div style="text-align:center; margin-top:100px; font-family:Arial;">
      <h1>😱 Server Error</h1>
      <p>Something broke! Try refreshing or going back.</p>
      <a href="/" style="color:#ff6b6b; font-size:1.5em;">← Home</a>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Enhanced Excuse Generator running at http://localhost:${port}`);
});