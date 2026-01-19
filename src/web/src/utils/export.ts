import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const exportToPNG = async (
  elementId: string,
  fileName: string = 'wallet-flow.png'
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#f9fafb'
    });

    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    throw error;
  }
};

export const exportToPDF = async (
  elementId: string,
  fileName: string = 'wallet-flow.pdf',
  title?: string
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff'
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    // Calculate dimensions to fit the image on the page
    const pdf = new jsPDF({
      orientation: img.width > img.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [img.width, img.height]
    });

    // Add title if provided
    if (title) {
      pdf.setFontSize(20);
      pdf.text(title, 20, 30);
    }

    // Add the image
    pdf.addImage(
      dataUrl,
      'PNG',
      0,
      title ? 50 : 0,
      img.width,
      img.height
    );

    pdf.save(fileName);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

export const downloadFlowData = (
  flowData: unknown,
  fileName: string = 'wallet-flow-data.json'
): void => {
  const dataStr = JSON.stringify(flowData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
};
