// Cambio de foto de perfil de manera interactiva
const inputPhoto = document.getElementById('inputPhoto');
const profileImage = document.getElementById('profileImage');

inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profileImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Automatización y optimización para descargar el PDF limpio
const btnDownload = document.getElementById('btnDownload');
const cvSheet = document.getElementById('cvSheet');

btnDownload.addEventListener('click', () => {
    btnDownload.textContent = "Generando PDF...";
    btnDownload.disabled = true;

    const opt = {
        margin:       0,
        filename:     'CV_Amador_Jara_Sistemas.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(cvSheet).set(opt).save().then(() => {
        btnDownload.innerHTML = '<i class="fa-solid fa-download mr-2"></i><span>Descargar PDF Profesional</span>';
        btnDownload.disabled = false;
    }).catch(err => {
        console.error(err);
        alert("Ocurrió un error al generar el PDF.");
        btnDownload.innerHTML = '<i class="fa-solid fa-download mr-2"></i><span>Descargar PDF Profesional</span>';
        btnDownload.disabled = false;
    });
});