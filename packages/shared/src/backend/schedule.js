import ical from 'node-ical'

export async function fetchCalendar() {
  try {
  const data = await ical.async.parseFile(
    'packages/shared/src/backend/ADECal.ics'
  )
  return data
} catch (error) {
  console.log("failed to parse calendar: \n", error);
  
}

  // const linkData = await ical.async.fromURL(
  //   'https://edt.univ-eiffel.fr/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1510&projectId=26&calType=ical&nbWeeks=4',
  // )
}
