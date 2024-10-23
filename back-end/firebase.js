const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port =5000;
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(cors());
app.use(bodyParser.json());
const db = admin.firestore();
const authenticateUser = async (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
const axios = require('axios');
const fetchStockData = async () => {
  const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const sensexUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:SENSEX&apikey=${alphaVantageApiKey}`;
  const niftyUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:NIFTY&apikey=${alphaVantageApiKey}`;

  try {
    const sensexResponse = await axios.get(sensexUrl);
    const niftyResponse = await axios.get(niftyUrl);

    const sensexData = sensexResponse.data["Time Series (Daily)"];
    const niftyData = niftyResponse.data["Time Series (Daily)"];

    const latestSensex = sensexData[Object.keys(sensexData)[0]];
    const latestNifty = niftyData[Object.keys(niftyData)[0]];

    return {
      sensex: {
        value: latestSensex["4. close"],
        change: ((latestSensex["4. close"] - latestSensex["1. open"]) / latestSensex["1. open"]) * 100
      },
      nifty: {
        value: latestNifty["4. close"],
        change: ((latestNifty["4. close"] - latestNifty["1. open"]) / latestNifty["1. open"]) * 100
      }
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return null;
  }
};

// Function to fetch Gold and Silver data from Metals API
const fetchGoldSilverData = async () => {
  const metalsApiKey = process.env.METALS_API_KEY;
  const url = `https://metals-api.com/api/latest?access_key=${metalsApiKey}&base=INR&symbols=XAU,XAG`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      gold: {
        price: data.rates.XAU, // Gold price per gram
        change: null  // Add logic for price change if needed
      },
      silver: {
        price: data.rates.XAG, // Silver price per gram
        change: null  // Add logic for price change if needed
      }
    };
  } catch (error) {
    console.error("Error fetching gold/silver data:", error);
    return null;
  }
};

// Function to fetch cryptocurrency data from CoinGecko API
const fetchCryptoData = async () => {
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=inr';

  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      bitcoin: {
        price: data.bitcoin.inr,
        change: null  // Add logic for price change if needed
      },
      ethereum: {
        price: data.ethereum.inr,
        change: null  // Add logic for price change if needed
      }
    };
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return null;
  }
};

// Combine all the data fetching into one API endpoint
app.get('/api/market-data', async (req, res) => {
  try {
    const [stockData, goldSilverData, cryptoData] = await Promise.all([
      fetchStockData(),
      fetchGoldSilverData(),
      fetchCryptoData()
    ]);

    if (!stockData || !goldSilverData || !cryptoData) {
      return res.status(500).json({ message: "Error fetching market data" });
    }

    res.json({
      stock: stockData,
      metals: goldSilverData,
      crypto: cryptoData
    });
  } catch (error) {
    console.error("Error in API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({
      message: 'Signed in successfully',
      uid: userRecord.uid,
      token: customToken
    });
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
app.get('/profile', authenticateUser, async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    const userDoc = await db.collection('profiles').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/profile', authenticateUser, async (req, res) => {
  const { name, age, income, savings, retirement_age, retirement_savings, risk_tolerance, userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  try {
    await db.collection('profiles').doc(userId).set({
      name, age, income, savings, retirement_age, retirement_savings, risk_tolerance,
    });
    res.status(200).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/messages', authenticateUser, async (req, res) => {
  const { text, user, userName } = req.body;
  try {
    await db.collection('messages').add({
      text,
      user,
      userName,
      createdAt: new Date().toISOString(),
    });
    res.status(201).send({ message: 'Message added successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.get('/messages', authenticateUser, async (req, res) => {
  try {
    const messagesSnapshot = await db.collection('messages').orderBy('createdAt').get();
    const messages = messagesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});