// Exemple de données (à remplacer par un appel API)
let classes = [
    {
        id: 1,
        name: "BUT Informatique 1",
        students: [
            {
                id: 3,
                name: "Sherwell Frankie",
                notes: [
                    { ue: "UC1", matiere: "Mathématiques", note: 15.00 },
                    { ue: "UC1", matiere: "Algorithmique", note: 12.00 },
                    { ue: "UC2", matiere: "Mathématiques", note: 14.00 },
                    { ue: "UC2", matiere: "Programmation", note: 16.00 },
                    { ue: "UC3", matiere: "Mathématiques", note: 13.00 },
                    { ue: "UC3", matiere: "Réseaux", note: 17.00 }
                ]
            },
            {
                id: 8,
                name: "Brambell Styrbjörn",
                notes: [
                    { ue: "UC1", matiere: "Mathématiques", note: 18.50 },
                    { ue: "UC1", matiere: "Algorithmique", note: 17.00 },
                    { ue: "UC2", matiere: "Mathématiques", note: 19.00 },
                    { ue: "UC2", matiere: "Programmation", note: 18.00 },
                    { ue: "UC3", matiere: "Mathématiques", note: 16.00 },
                    { ue: "UC3", matiere: "Réseaux", note: 15.00 }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "BUT Informatique 2",
        students: [
            {
                id: 9,
                name: "Eagle Tú",
                notes: [
                    { ue: "UC1", matiere: "Mathématiques", note: 20.00 },
                    { ue: "UC1", matiere: "Algorithmique", note: 19.50 },
                    { ue: "UC2", matiere: "Mathématiques", note: 18.00 },
                    { ue: "UC2", matiere: "Programmation", note: 17.50 },
                    { ue: "UC3", matiere: "Mathématiques", note: 17.00 },
                    { ue: "UC3", matiere: "Réseaux", note: 16.50 }
                ]
            },
            {
                id: 10,
                name: "Bearblock Clélia",
                notes: [
                    { ue: "UC1", matiere: "Mathématiques", note: 19.50 },
                    { ue: "UC1", matiere: "Algorithmique", note: 18.50 },
                    { ue: "UC2", matiere: "Mathématiques", note: 17.50 },
                    { ue: "UC2", matiere: "Programmation", note: 16.50 },
                    { ue: "UC3", matiere: "Mathématiques", note: 16.00 },
                    { ue: "UC3", matiere: "Réseaux", note: 15.50 }
                ]
            }
        ]
    }
];

// Fonction pour afficher les classes et les notes
function displayClasses(classes) {
    const container = document.getElementById('classes-container');
    container.innerHTML = ''; // Clear previous content
    classes.forEach(cls => {
        const classDiv = document.createElement('div');
        classDiv.className = 'class';
        classDiv.innerHTML = `<h2>${cls.name}</h2>`;

        cls.students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student';
            studentDiv.innerHTML = `<h3>${student.name}</h3>`;

            const notesDiv = document.createElement('div');
            notesDiv.className = 'notes';
            const ueMap = {};
            student.notes.forEach(note => {
                if (!ueMap[note.ue]) {
                    ueMap[note.ue] = [];
                }
                ueMap[note.ue].push(note);
            });

            for (const ue in ueMap) {
                const ueDiv = document.createElement('div');
                ueDiv.innerHTML = `<strong>${ue}</strong>`;
                ueMap[ue].forEach(note => {
                    const noteDiv = document.createElement('div');
                    noteDiv.innerHTML = `${note.matiere} - Note: ${note.note}`;
                    ueDiv.appendChild(noteDiv);
                });
                const ueAverage = calculateAverage(ueMap[ue]);
                const ueAverageDiv = document.createElement('div');
                ueAverageDiv.innerHTML = `<strong>Moyenne UC: ${ueAverage.toFixed(2)}</strong>`;
                ueDiv.appendChild(ueAverageDiv);
                notesDiv.appendChild(ueDiv);
            }

            const overallAverage = calculateOverallAverage(student.notes);
            const overallAverageDiv = document.createElement('div');
            overallAverageDiv.innerHTML = `<strong>Moyenne Générale: ${overallAverage.toFixed(2)}</strong>`;
            notesDiv.appendChild(overallAverageDiv);

            studentDiv.appendChild(notesDiv);
            classDiv.appendChild(studentDiv);
        });

        container.appendChild(classDiv);
    });
}

// Fonction pour calculer la moyenne
function calculateAverage(notes) {
    const total = notes.reduce((sum, note) => sum + note.note, 0);
    return total / notes.length;
}

// Fonction pour calculer la moyenne générale
function calculateOverallAverage(notes) {
    const ueMap = {};
    notes.forEach(note => {
        if (!ueMap[note.ue]) {
            ueMap[note.ue] = [];
        }
        ueMap[note.ue].push(note);
    });

    let totalAverage = 0;
    let ueCount = 0;
    for (const ue in ueMap) {
        const ueAverage = calculateAverage(ueMap[ue]);
        totalAverage += ueAverage;
        ueCount++;
    }

    return totalAverage / ueCount;
}

// Fonction pour ajouter une note
function addNote() {
    const studentSelect = document.getElementById('student-select');
    const ucSelect = document.getElementById('uc-select');
    const subjectSelect = document.getElementById('subject-select');
    const noteInput = document.getElementById('note-input');

    const studentId = studentSelect.value;
    const uc = ucSelect.value;
    const subject = subjectSelect.value;
    const note = parseFloat(noteInput.value);
    if (!studentId || !uc || !subject || isNaN(note)) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const student = findStudentById(studentId);
    if (student) {
        student.notes.push({ ue: uc, matiere: subject, note: note });
        displayClasses(classes);
        populateSelects();
    }
}

// Fonction pour trouver un élève par son ID
function findStudentById(studentId) {
    for (const cls of classes) {
        for (const student of cls.students) {
            if (student.id == studentId) {
                return student;
            }
        }
    }
    return null;
}

// Fonction pour peupler les sélections
function populateSelects() {
    const studentSelect = document.getElementById('student-select');
    const ucSelect = document.getElementById('uc-select');
    const subjectSelect = document.getElementById('subject-select');

    studentSelect.innerHTML = '';
    ucSelect.innerHTML = '';
    subjectSelect.innerHTML = '';

    classes.forEach(cls => {
        cls.students.forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.name;
            studentSelect.appendChild(option);
        });
    });

    studentSelect.addEventListener('change', () => {
        const studentId = studentSelect.value;
        const student = findStudentById(studentId);
        if (student) {
            const ueSet = new Set();
            student.notes.forEach(note => ueSet.add(note.ue));
            ucSelect.innerHTML = '';
            ueSet.forEach(ue => {
                const option = document.createElement('option');
                option.value = ue;
                option.textContent = ue;
                ucSelect.appendChild(option);
            });
        }
    });

    ucSelect.addEventListener('change', () => {
        const studentId = studentSelect.value;
        const uc = ucSelect.value;
        const student = findStudentById(studentId);
        if (student) {
            const subjectSet = new Set();
            student.notes.forEach(note => {
                if (note.ue === uc) {
                    subjectSet.add(note.matiere);
                }
            });
            subjectSelect.innerHTML = '';
            subjectSet.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                subjectSelect.appendChild(option);
            });
        }
    });
}

// Appel de la fonction pour afficher les classes
displayClasses(classes);
populateSelects();

// Exemple d'intégration avec une API
async function fetchClasses() {
    const response = await fetch('/api/classes'); // Remplacez par l'URL de votre API
    classes = await response.json();
    displayClasses(classes);
    populateSelects();
}

// fetchClasses(); // Décommentez cette ligne pour utiliser l'API

// Fonction pour exporter les données en XLS
function exportToXLS() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatDataForXLS(classes));
    XLSX.utils.book_append_sheet(wb, ws, 'Classes');
    XLSX.writeFile(wb, 'classes.xlsx');
}

// Fonction pour formater les données pour XLS
function formatDataForXLS(classes) {
    const formattedData = [];
    const headers = ["Étudiant", "UC1 Mathématiques", "UC1 Algorithmique", "UC2 Mathématiques", "UC2 Programmation", "UC3 Mathématiques", "UC3 Réseaux", "Moyenne UC1", "Moyenne UC2", "Moyenne UC3", "Moyenne Générale"];
    formattedData.push(headers);

    classes.forEach(cls => {
        cls.students.forEach(student => {
            const ueMap = {};
            student.notes.forEach(note => {
                if (!ueMap[note.ue]) {
                    ueMap[note.ue] = [];
                }
                ueMap[note.ue].push(note);
            });

            const row = [student.name];
            headers.slice(1, -1).forEach(header => {
                if (header.startsWith("UC")) {
                    const ue = header.split(" ")[0];
                    const matiere = header.split(" ")[1];
                    const note = ueMap[ue]?.find(n => n.matiere === matiere)?.note || "";
                    row.push(note);
                } else if (header.startsWith("Moyenne")) {
                    const ue = header.split(" ")[1];
                    const ueAverage = calculateAverage(ueMap[ue] || []);
                    row.push(ueAverage.toFixed(2));
                }
            });
            const overallAverage = calculateOverallAverage(student.notes);
            row.push(overallAverage.toFixed(2));
            formattedData.push(row);
        });
    });

    return formattedData;
}

// Fonction pour exporter les données en PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape'); // Set the orientation to landscape
    doc.text("Classes et Notes", 10, 10);

    const headers = ["Étudiant", "UC1 Mathématiques", "UC1 Algorithmique", "UC2 Mathématiques", "UC2 Programmation", "UC3 Mathématiques", "UC3 Réseaux", "Moyenne UC1", "Moyenne UC2", "Moyenne UC3", "Moyenne Générale"];
    doc.text(headers.join(", "), 10, 20);

    let yOffset = 30;
    classes.forEach((cls, clsIndex) => {
        cls.students.forEach((student, studentIndex) => {
            const ueMap = {};
            student.notes.forEach(note => {
                if (!ueMap[note.ue]) {
                    ueMap[note.ue] = [];
                }
                ueMap[note.ue].push(note);
            });

            const row = [student.name];
            headers.slice(1, -1).forEach(header => {
                if (header.startsWith("UC")) {
                    const ue = header.split(" ")[0];
                    const matiere = header.split(" ")[1];
                    const note = ueMap[ue]?.find(n => n.matiere === matiere)?.note || "";
                    row.push(note);
                } else if (header.startsWith("Moyenne")) {
                    const ue = header.split(" ")[1];
                    const ueAverage = calculateAverage(ueMap[ue] || []);
                    row.push(ueAverage.toFixed(2));
                }
            });
            const overallAverage = calculateOverallAverage(student.notes);
            row.push(overallAverage.toFixed(2));

            doc.text(row.join(", "), 10, yOffset);
            yOffset += 10;
        });
    });

    doc.save('classes.pdf');
}

// Fonction pour importer les données depuis XLS
function importFromXLS() {
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Vérifiez si les données importées sont valides
        if (json.length > 0 && json[0].Étudiant && json[0].UC) {
            classes = parseImportedData(json);
            displayClasses(classes);
            populateSelects();
        } else {
            alert('Le fichier importé n\'est pas valide.');
        }
    };
    reader.readAsArrayBuffer(file);
}

// Fonction pour parser les données importées
function parseImportedData(json) {
    const parsedData = [];
    json.forEach(row => {
        const cls = parsedData.find(cls => cls.name === row.Classe);
        if (!cls) {
            parsedData.push({
                id: parsedData.length + 1,
                name: row.Classe,
                students: []
            });
        }
        const student = cls.students.find(student => student.name === row.Étudiant);
        if (!student) {
            cls.students.push({
                id: cls.students.length + 1,
                name: row.Étudiant,
                notes: []
            });
        }
        student.notes.push({
            ue: row.UC,
            matiere: row.Matière,
            note: parseFloat(row.Note)
        });
    });
    return parsedData;
}
