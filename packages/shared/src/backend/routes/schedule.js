const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const router = express.Router()

const ical = require('node-ical')


async function fetchCalendar() {
  try {
    const data = await ical.async.fromURL(
      'https://edt.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1510&projectId=26&calType=ical&nbWeeks=40'
    )
    return data
  } catch (error) {
    console.log('failed to parse calendar: \n', error)
  }
}

// /schedule
router.get('/schedule', async (req, res) => {
  try {
    const data = await fetchCalendar()
    res.json(data)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
