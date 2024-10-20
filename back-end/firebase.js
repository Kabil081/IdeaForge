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
  try {
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


app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      emailVerified: false
    });
    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(201).json({
      message: 'User created successfully',
      uid: userRecord.uid,
      token: customToken
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(400).json({ error: error.message });
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

// Profile routes
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
