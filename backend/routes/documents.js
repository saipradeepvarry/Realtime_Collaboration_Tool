const express = require('express');
const Document = require('../models/Document');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// 🔐 Get all documents for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id });
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📄 Get a single document by ID (only if user owns it)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(document);
  } catch (error) {
    console.error('Error fetching document:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📝 Create a new document
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newDoc = new Document({
      title,
      content,
      owner: req.user.id,
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (error) {
    console.error('Error creating document:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔁 Update a document (only if user owns it)
router.put('/:id', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    document.title = title || document.title;
    document.content = content || document.content;

    const updatedDoc = await document.save();
    res.status(200).json(updatedDoc);
  } catch (error) {
    console.error('Error updating document:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ❌ Delete a document (only if user owns it)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found' });

    if (document.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await document.deleteOne();
    res.status(200).json({ message: 'Document deleted' });
  } catch (error) {
    console.error('Error deleting document:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
