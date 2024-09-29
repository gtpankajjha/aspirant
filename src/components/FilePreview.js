// src/components/FilePreview.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Configure PDF.js worker using the local path
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

const FilePreview = () => {
  const { id } = useParams(); // Get user ID from URL
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [fileType, setFileType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [error, setError] = useState('');

  // Mapping user IDs to file URLs and types
  const fileMap = {
    '1': { url: '/files/user1.pdf', type: 'pdf' },
    '2': { url: '/files/user2.pdf', type: 'pdf' },
    '3': { url: '/files/user3.txt', type: 'txt' },
    '4': { url: '/files/user4.docx', type: 'docx' },
    '5': { url: '/files/user5.pdf', type: 'pdf' },
    '6': { url: '/files/user6.txt', type: 'txt' },
    // Add more mappings as needed
  };

  useEffect(() => {
    console.log("Worker URL:", pdfjs.GlobalWorkerOptions.workerSrc);
 
    console.log(`Fetching file for user ID: ${id}`);
    const file = fileMap[id];
    if (file) {
      console.log(`File found: ${JSON.stringify(file)}`);
      setFileUrl(file.url);
      setFileType(file.type);
    } else {
      console.error('No file available for this user.');
      setError('No file available for this user.');
    }
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(`PDF loaded with ${numPages} pages.`);
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page on load
  };

  const renderPDF = () => (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<p>Loading PDF...</p>}
        onLoadError={(error) => {
          console.error('Error loading PDF:', error);
          setError('Failed to load PDF file.');
        }}
      >
        <Page pageNumber={pageNumber} width={600} />
      </Document>
      {numPages && (
        <div>
          <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
            Previous
          </button>
          <span>{` Page ${pageNumber} of ${numPages}`}</span>
          <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
  
  

  const renderDOCX = () => (
    <iframe
      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
        `${window.location.origin}${fileUrl}`
      )}`}
      width="100%"
      height="600px"
      title="DOCX Preview"
      style={{ border: 'none' }}
      onError={(e) => {
        console.error('Error loading DOCX:', e);
        setError('Failed to load DOCX file.');
      }}
    ></iframe>
  );

  const renderTXT = () => (
    <iframe
      src={fileUrl}
      width="100%"
      height="600px"
      title="TXT Preview"
      style={{ border: 'none' }}
      onError={(e) => {
        console.error('Error loading TXT:', e);
        setError('Failed to load TXT file.');
      }}
    ></iframe>
  );

  const renderFile = () => {
    console.log(`Rendering file type: ${fileType}`); // Add this line
    switch (fileType) {
      case 'pdf':
        return renderPDF();
      case 'docx':
        return renderDOCX();
      case 'txt':
        return renderTXT();
      default:
        return <p>Unsupported file type.</p>;
    }
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!fileUrl) {
    return <p>Loading file information...</p>;
  }

  return (
    <div>
      <h2>File Preview</h2>
      {renderFile()}
    </div>
  );
};

export default FilePreview;
