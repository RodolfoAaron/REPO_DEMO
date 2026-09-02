document.addEventListener("DOMContentLoaded", () => {
    const downloadBtn = document.getElementById("downloadBtn");

    if(downloadBtn) {
        downloadBtn.addEventListener("click", (event) => {
            event.preventDefault(); 

            // Asegúrate de tener la imagen cv_original.jpg en tu carpeta
            const imageUrl = "cv_original.jpg"; 
            const fileName = "CV_Angelica_Chalas.jpg";

            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Descargando...';

            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = blobUrl;
                    link.download = fileName;
                    
                    document.body.appendChild(link);
                    link.click();
                    
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);

                    downloadBtn.innerHTML = originalText;
                })
                .catch(error => {
                    console.error("Error al descargar:", error);
                    alert("Asegúrate de usar Live Server en VS Code para que funcione la descarga.");
                    downloadBtn.innerHTML = originalText;
                });
        });
    }
});