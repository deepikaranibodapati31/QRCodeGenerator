const text = document.getElementById("textOrURL");
const QRCodeGenerator = document.getElementById("QRCode");

QRCodeGenerator.addEventListener('click', () => {
    const inputValue = text.value; 
    var div = document.getElementsByClassName('container')[0]; 
    div.style.height = '500px'; 
    if (inputValue) {
        fetchQRCode(inputValue);
    }
});

function fetchQRCode(inputValue) {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(inputValue)}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.blob(); 
        })
        .then(data => {
            const QRImage = document.getElementById("QRImage");
            QRImage.src = URL.createObjectURL(data);
        })
        .catch(error => {
            console.error(error.message);
            alert("Failed to generate QR code.");
        });
}

