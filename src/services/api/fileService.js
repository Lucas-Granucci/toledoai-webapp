import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
class FileService {
    async downloadPDF(fileText) {
        const response = await fetch('/api/download-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: fileText })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate PDF');
        }

        const htmlContent = await response.text();
        await this.convertHTMLToPDF(htmlContent);
    }

    async convertHTMLToPDF(htmlContent) {
        try {
            const iframe = document.createElement('iframe');
            iframe.style.cssText = `
                position: absolute !important;
                top: -10000px !important;
                left: -10000px !important;
                width: 210mm !important;
                height: 297mm !important;
                border: none !important;
                visibility: hidden !important;
            `;
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { margin: 0; padding: 20px; width: 170mm; }
                        * { box-sizing: border-box; }
                    </style>
                </head>
                <body>${htmlContent}</body>
                </html>
            `);
            iframeDoc.close();

            await new Promise(resolve => {
                iframe.onload = resolve;
                setTimeout(resolve, 100);
            });

            const canvas = await html2canvas(iframe.contentDocument.body, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            //const { jsPDF } = window.jsPDF;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('document.pdf');
            document.body.removeChild(iframe);
        } catch (err) {
            console.error("Error generating PDF: ", err);
        }
    }
}

export const fileService = new FileService();