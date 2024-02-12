'use client'
import React, { useEffect } from 'react';
import jsPDF from 'jspdf';
import { Document, Page, Text, View, PDFDownloadLink, Image, StyleSheet } from '@react-pdf/renderer';
import { Patient, Report } from '@/types';

interface DocumentProps {
  data: Patient
  report: Report[]
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    padding: 20,
    height: '100%',
    width: '100%',
    fontFamily: 'Times-Roman'
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    boxShadow: '0 0 10 rgba(0, 0, 0, 0.1)',
    padding: 30,
    margin: 'auto',
    maxWidth: 800,
    height: '100%',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 900,
    color: '#003049',
    marginBottom: 10
  },
  address: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
    border: '1 solid #003049',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 4
  },
  sectionContent: {
    marginTop: 10,
  },
  diagnosis: {
    fontWeight: 'bold',
    color: '#dc3545'
  },
  doctorInfo: {
    fontSize: 12,
    border: '1 solid #003049',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 20
  },
  doctorInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 4
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#003049',
    padding: 3
  }
});

const MyDocument:React.FC<DocumentProps> = ({data, report}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.companyName}>Safia Medicare</Text>
          <Text style={styles.address}>
            567-B Hakeeman Wala Chowk GM Abad, Faisalabad
          </Text>
          <Text style={styles.address}>
            Phone: +123 456 7890
          </Text>
          <Text style={styles.address}>
            Email: info@safiamedicare.com
          </Text>
        </View>
        <Text style={styles.title}>Patient Diagnosis Report</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.sectionContent}>
            <Text>Name: {`${data?.firstName} ${data?.lastName}`}</Text>
            <Text>Age: {data?.dateOfBirth}</Text>
            <Text>Gender: {data?.gender}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.address}>Date: {report[0]?.time}</Text>
            <Text>{"\t"}The patient has been diagnosed with <Text style={styles.diagnosis}>{report[0]?.disease}</Text>.</Text>
            <Text>Additional notes: {report[0]?.diagnosis}</Text>
          </View>
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorInfoTitle}>Doctor Information</Text>
          <View style={styles.sectionContent}>
            <Text>Name: Dr. Rainbow Bright</Text>
            <Text>Specialty: Internal Medicine</Text>
            <Text>Contact: +1 (123) 456-7890</Text>
            <Text>Email: doctor@safiamedicare.com</Text>
          </View>
        </View>
        <Text style={styles.footer}>© 2024 Safia Medicare. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);


const PDFPage = () => {
  useEffect(() => {
    const generatePDF = async () => {
      const pdfDoc = new jsPDF();
      const pdfBlob = await pdfDoc.output('bloburl'); // Generate blob URL
      window.open(pdfBlob, '_blank'); // Open in new tab
    };

    generatePDF();
  }, []);

  return (
    <div>
      <p>Generating PDF...</p>
    </div>
  );
};


export default function PDFPage2({ data, report }: { data: Patient, report: Report[] }){
  return (
    <div>
      <PDFDownloadLink document={<MyDocument data={data} report={report} />} fileName="example.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );
}
