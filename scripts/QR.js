// config du scanner de code QR
const html5QrCodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    /* verbose= */ false
);

html5QrCodeScanner.render(onScanSuccess, onScanError);

// variables pour indiquer l'état du code QR
let currentState = 'non expiré';

function onScanSuccess(decodedText, decodedResult) {
    const [name, expiration] = decodedText.split('|');
    const now = new Date();
    const expirationDate = new Date(expiration);

    if (now <= expirationDate) {
        document.getElementById('scan-result').innerText = `Présence enregistrée pour: ${name} (Code QR: ${currentState})`;
        currentState = 'non expiré';
        // LIEN BDD ICI
    } else {
        document.getElementById('scan-result').innerText = `Code QR expiré pour: ${name} (Code QR: ${currentState})`;
        currentState = 'expiré';
    }
}

function onScanError(errorMessage) {
    console.error(`Erreur de scan: ${errorMessage}`);
}

// variables pour la génération de code QR
let qrCodeInterval;
let currentQRCodeData = '';

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

function stopGeneratingQRCode() {                       // Fct pour arrêter la génération de code QR
    if (qrCodeInterval) {
        clearInterval(qrCodeInterval);
        qrCodeInterval = null;
    }
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
