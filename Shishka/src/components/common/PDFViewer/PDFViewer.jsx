import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import policy from './../../../assets/pdf_files/Политика_Конфиденциальности';

const PdfViewer = () => {
    // Получаем URL файла из пути внутри PUBLIC_URL

    return (
        <div className='main'>
            <div className='container'>
                <h1>Политика конфиденциальности</h1>
                <Document file={policy}>
                    <Page pageNumber={1} width={500} />
                </Document>
            </div>
        </div>
    );
};

export default PdfViewer;
