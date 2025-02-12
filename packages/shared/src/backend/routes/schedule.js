const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// /schedule
router.get('/', async (req, res) => {
  try {
    const data = await fetchCalendar();
    res.json(data)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;