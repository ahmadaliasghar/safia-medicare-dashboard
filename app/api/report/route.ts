// Import necessary dependencies
import { NextRequest, NextResponse } from 'next/server';
import { PDFRenderer } from '@react-pdf/renderer';
import MyDocument from '@/app/diagnose/compnents/Document'; // Adjust the path as needed
import fs from 'fs';

export const POST = async (request: NextRequest) => {
    try {
        const pdfStream = PDFRenderer.renderToStream(MyDocument());

        const filePath = './public/report.pdf'; 
        const output = fs.createWriteStream(filePath);
        
        pdfStream.pipe(output);

        await new Promise((resolve, reject) => {
            output.on('finish', resolve);
            output.on('error', reject);
        });

        // Return the path to the generated PDF file
        return NextResponse.json({
            success: true,
            status: 200,
            message: 'Report generated successfully',
            reportPath: filePath,
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            error: "Internal Server Error",
        }, {status: 500});
    }
};

// Define a new API route to handle downloading the PDF
export const GET = async (request: NextRequest) => {
    const { reportPath } = request.query;

    if (!reportPath) {
        return NextResponse.json({
            success: false,
            error: "Missing reportPath parameter",
        }, {status: 400});
    }

    // Send the PDF file as a response with appropriate headers for download
    return NextResponse.stream(fs.createReadStream(reportPath), {
        headers: {
            'Content-Disposition': 'attachment; filename="report.pdf"',
            'Content-Type': 'application/pdf',
        },
    });
};
