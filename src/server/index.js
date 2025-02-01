import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://legalese-simplifier-1.onrender.com', // Replace with your production domain
    'chrome-extension://*' // Allow Chrome extensions
  ],
  methods: ['POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Mock analysis function - replace with actual AI processing in production
function analyzeLegalDocument(text) {
  return {
    summary: `Analysis of document (${text.slice(0, 50)}...): This document appears to be ${
      text.length > 1000 ? 'a lengthy' : 'a brief'
    } legal agreement.`,
    redFlags: [
      "Identified potential concerns based on document content",
      "Standard legal terms detected",
      "Review recommended by legal professional"
    ]
  };
}

app.post('/api/analyze', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No document text provided' });
    }

    const analysis = analyzeLegalDocument(text);
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze document' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
