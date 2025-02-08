// récupère l'url Ical
async function fetchICal(url) {
    try {
        const response = await fetch(url, { mode: 'cors' }); // Ajouter mode: 'cors' pour gérer les problèmes de CORS
        if (!response.ok) {
            throw new Error(`Erreur de réseau: ${response.status}`);
        }
        const icalData = await response.text();
        const jcalData = ICAL.parse(icalData);
        const comp = new ICAL.Component(jcalData);
        const events = comp.getAllSubcomponents('vevent');
        return events;
    } catch (error) {
        console.error('Erreur lors de la récupération du fichier iCal:', error);
        alert('Erreur lors de la récupération du fichier iCal. Veuillez vérifier l\'URL et réessayer.');
        return [];
    }
}

// affiche les events du calendrier
function displayEvents(events, viewType) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // Nettoyer le calendrier existant

    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    // fait des sections pour chaque jour, semaine ou mois en fonction de la vue choisie
    if (viewType === 'day') {
        const today = new Date();
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `<h2>${daysOfWeek[today.getDay() - 1]}</h2>`;
        calendar.appendChild(dayElement);
        addTimeSlots(dayElement);
        addEventsToDay(events, today, dayElement);
    } else if (viewType === 'week') {
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Lundi
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.innerHTML = `<h2>${daysOfWeek[i]}</h2>`;
            calendar.appendChild(dayElement);
            addTimeSlots(dayElement);
            addEventsToDay(events, day, dayElement);
        }
    } else if (viewType === 'month') {
        const today = new Date();
        const month = months[today.getMonth()];
        const monthElement = document.createElement('div');
        monthElement.className = 'month';
        monthElement.innerHTML = `<h2>${month}</h2>`;
        calendar.appendChild(monthElement);
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(today.getFullYear(), today.getMonth(), i);
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.innerHTML = `<h3>${i}</h3>`;
            monthElement.appendChild(dayElement);
            addTimeSlots(dayElement);
            addEventsToDay(events, day, dayElement);
        }
    }
}

// pour avoir les tranches d'heures
function addTimeSlots(dayElement) {
    for (let hour = 8; hour < 18; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00 - ${hour + 1}:00`;
        dayElement.appendChild(timeSlot);
    }
}

// fct pour ajouter les événements à un jour donné
function addEventsToDay(events, day, dayElement) {
    events.forEach(event => {
        const startDate = event.getFirstPropertyValue('dtstart').toJSDate();
        const summary = event.getFirstPropertyValue('summary');
        if (startDate.toDateString() === day.toDateString()) {
            const eventElement = document.createElement('div');
            eventElement.className = 'event';
            eventElement.textContent = `${startDate.toLocaleTimeString()} - ${summary}`;
            dayElement.appendChild(eventElement);
        }
    });
}

// Charge le calendrier
async function loadCalendar() {
    const url = document.getElementById('ical-url').value;
    if (url) {
        const events = await fetchICal(url);
        const viewType = document.getElementById('view-type').value;
        displayEvents(events, viewType);
    } else {
        alert('Veuillez entrer une URL iCal valide.');
    }
}

// Update le calendrier
async function updateCalendarView() {
    const url = document.getElementById('ical-url').value;
    if (url) {
        const events = await fetchICal(url); // Ajouter await ici
        const viewType = document.getElementById('view-type').value;
        displayEvents(events, viewType);
    } else {
        alert('Veuillez entrer une URL iCal valide.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.loadCalendar = loadCalendar;
    window.updateCalendarView = updateCalendarView;
});
