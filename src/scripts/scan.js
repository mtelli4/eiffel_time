let userName = '';
let userFirstName = '';

// Configuration du scanner de code QR
let html5QrCodeScanner;

function login() {
    userName = document.getElementById('name').value;
    userFirstName = document.getElementById('firstname').value;

    if (userName && userFirstName) {
        document.getElementById('user-name').innerText = userName;
        document.getElementById('user-firstname').innerText = userFirstName;
        document.getElementById('user-info').style.display = 'block';

        // Initialiser le scanner de code QR
        html5QrCodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );

        html5QrCodeScanner.render(onScanSuccess, onScanError);
    } else {
        alert('Veuillez entrer votre nom et prénom.');
    }
}

function onScanSuccess(decodedText, decodedResult) {
    const [name, expiration] = decodedText.split('|');
    const now = new Date();
    const expirationDate = new Date(expiration);

    if (now <= expirationDate) {
        document.getElementById('scan-result').innerText = `Présence enregistrée pour: ${name} (Scanné par: ${userName} ${userFirstName})`;
        // LIEN BDD ICI
        registerPresence(name);
    } else {
        document.getElementById('scan-result').innerText = `Code QR expiré pour: ${name} (Scanné par: ${userName} ${userFirstName})`;
    }
}

function onScanError(errorMessage) {
    console.error(`Erreur de scan: ${errorMessage}`);
}

// Fonction pour enregistrer la présence dans la base de données
async function registerPresence(name) {
    try {
        const response = await fetch('https://votre-api.com/register-presence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        });

        if (!response.ok) {
            throw new Error(`Erreur de réseau: ${response.status}`);
        }

        const result = await response.json();
        console.log('Présence enregistrée avec succès:', result);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la présence:', error);
        alert('Erreur lors de l\'enregistrement de la présence. Veuillez réessayer.');
    }
}
