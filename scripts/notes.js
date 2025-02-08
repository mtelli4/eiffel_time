// init des élèves et notes
let students = JSON.parse(localStorage.getItem('students')) || [];

// charger les élèves dans la liste déroulante
function loadStudents() {
    const studentSelect = document.getElementById('student-select');
    studentSelect.innerHTML = '';
    students.forEach((student, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}

// charger les notes de l'élève sélectionné
function loadStudentNotes() {
    const studentSelect = document.getElementById('student-select');
    const selectedIndex = studentSelect.value;
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    if (selectedIndex !== '') {
        const student = students[selectedIndex];
        student.notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = `${note.subject} - ${note.competence}: ${note.grade}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.onclick = () => deleteNote(selectedIndex, index);
            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    }
}

// ajouter une note à un élève
function addNote() {
    const studentName = document.getElementById('student-name').value;
    const subject = document.getElementById('subject').value;
    const competence = document.getElementById('competence').value;
    const grade = document.getElementById('grade').value;

    let student = students.find(s => s.name === studentName);
    if (!student) {
        student = { name: studentName, notes: [] };
        students.push(student);
    }

    student.notes.push({ subject, competence, grade });
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
    loadStudentNotes();
}

// suppr une note
function deleteNote(studentIndex, noteIndex) {
    students[studentIndex].notes.splice(noteIndex, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudentNotes();
}

loadStudents();
