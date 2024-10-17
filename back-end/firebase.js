const app=require('express');
const admin=require('firebase-admin');
const bodyParser=require('body-parser');
const cors =require('cors');
const app=express();
const port=5173;
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.use(cors())
app.use(bodyParser.json())
app.post('/signup', async (req, res) => {
    const{ email, password }=req.body;
    try {
      const userRecord = await admin.auth().createUser({ email, password });
      await admin.firestore().collection('users').doc(userRecord.uid).set({
        email: userRecord.email,
        createdAt: new Date(),
      });
      res.status(201).send({ uid: userRecord.uid });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});
app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
});