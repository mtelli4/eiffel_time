//const { insertPresenceData } = require('./db_con'); // Importer la connexion à la base de données

// variables pour la génération de code QR
let qrCodeInterval;
let currentQRCodeData = '';
let presenceData = [];

function startGeneratingQRCode() {                      // Fct pour démarrer la génération de code QR
    const name = document.getElementById('name').value;
    if (name) {
        if (qrCodeInterval) {
            clearInterval(qrCodeInterval);
        }
        generateQRCode(name);
        qrCodeInterval = setInterval(() => generateQRCode(name), 5000);
    } else {
        alert('Veuillez entrer un nom.');
    }
}

async function stopGeneratingQRCode() {                       // Fct pour arrêter la génération de code QR
    console.log('Arrêt de la génération de code QR');
    if (qrCodeInterval) {
        clearInterval(qrCodeInterval);
        qrCodeInterval = null;
    }
    // Nettoyer le code QR de la page
    const qrcodeElement = document.getElementById("qrcode");
    if (qrcodeElement) {
        qrcodeElement.innerHTML = '';
        console.log('Code QR nettoyé');
    } else {
        console.error('Élément qrcode non trouvé');
    }

    // Insérer les données de présence dans la base de données
    for (const data of presenceData) {
        await insertPresenceData(data.name, data.status);
    }
    presenceData = []; // Réinitialiser les données de présence
}

function generateQRCode(name) {                        // Fct pour générer un code QR
    const duration = 5000; // 5 secondes en millisecondes
    const expiration = new Date(Date.now() + duration).toISOString();
    currentQRCodeData = `${name}|${expiration}`;

    const qrcodeElement = document.getElementById("qrcode");    // Nettoyer l'ancien code QR
    qrcodeElement.innerHTML = '';

    const qrcode = new QRCode(qrcodeElement, {         // Générer un nouveau code QR
        text: currentQRCodeData,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function simulateScan() {                               // Fct pour simuler un scan réussi
    const name = document.getElementById('name').value;
    if (name) {
        const now = new Date();
        const [scannedName, expiration] = currentQRCodeData.split('|');
        const expirationDate = new Date(expiration);

        if (now <= expirationDate) {
            addToScanList(name, 'non expiré');
            presenceData.push({ name: name, status: 'non expiré' });
        } else {
            addToScanList(name, 'expiré');
            presenceData.push({ name: name, status: 'expiré' });
        }

        // Effacer le nom entré
        document.getElementById('name').value = '';
    } else {
        alert('Veuillez entrer un nom.');
    }
}

function addToScanList(name, status) {                  // Fct pour ajouter un nom à la liste des scans
    const scanResults = document.getElementById('scan-results');
    const listItem = document.createElement('li');
    listItem.textContent = `Présence enregistrée pour: ${name} (Code QR: ${status})`;
    scanResults.appendChild(listItem);
}
