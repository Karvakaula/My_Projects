

const express = require('express');
const router = express.Router();
const List = require('../schemas/ListSchema');


router.post('/list', async (req, res) => {
  try {
    const newList = await List.create(req.body);
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete('/list/:id', async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/lists', async (req, res) => {
    try {
        const lists = await List.find();
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router;
