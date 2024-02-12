// 'use server'
// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// // Define styles for the report
// // Dummy data for hospital, doctor, and patient
// const hospitalData = {
//   name: "Example Hospital",
//   address: "123 Main St, City, Country",
//   logo: "https://via.placeholder.com/150",
// };

// const doctorData = {
//   name: "Dr. John Smith",
//   address: "456 Oak St, City, Country",
//   contact: "123-456-7890",
//   specialty: "Cardiology"
// };

// const patientData = {
//   firstName: "Jane",
//   lastName: "Doe",
//   age: 45,
//   gender: "Female",
//   contact: "987-654-3210",
//   diagnosis: "Hypertension"
// };

// // Define the patient report structure
// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <View style={styles.flexRow}>
//           <View>
//             <Image style={styles.logo} src={hospitalData.logo} />
//             <Text style={styles.header}>{hospitalData.name}</Text>
//             <Text style={styles.content}>Report #: 123</Text>
//             <Text style={styles.content}>Date: {new Date()}</Text>
//           </View>
//           <View>
//             <Text style={styles.subheader}>Doctor Information</Text>
//             <Text style={styles.content}>Name: {doctorData.name}</Text>
//             <Text style={styles.content}>Address: {doctorData.address}</Text>
//             <Text style={styles.content}>Contact: {doctorData.contact}</Text>
//             <Text style={styles.content}>Specialty: {doctorData.specialty}</Text>
//           </View>
//         </View>
//         <View style={styles.divider} />
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subheader}>Patient Information</Text>
//         <Text style={styles.content}>Name: {patientData.firstName} {patientData.lastName}</Text>
//         <Text style={styles.content}>Age: {patientData.age}</Text>
//         <Text style={styles.content}>Gender: {patientData.gender}</Text>
//         <Text style={styles.content}>Contact: {patientData.contact}</Text>
//         <View style={styles.divider} />
//       </View>
//       <View style={styles.section}>
//         <Text style={styles.subheader}>Diagnosis</Text>
//         <View style={styles.diagnosis}>
//           <Text style={styles.content}>Condition: {patientData.diagnosis}</Text>
//           <Text style={styles.content}>Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante eu lectus posuere suscipit. Fusce vitae posuere magna. In hac habitasse platea dictumst. Donec euismod, mauris vel semper luctus, odio tellus consequat arcu, vitae vestibulum justo mi id dolor. Duis varius ut nisi sed lobortis. Ut eget lorem ex. Duis auctor risus velit, et dapibus massa mattis id. Nullam aliquet, libero a dictum feugiat, libero eros vehicula eros, nec vehicula ligula purus at lorem. Aliquam vitae purus felis. Aliquam scelerisque tempor dapibus.</Text>
//         </View>
//       </View>
//       <Text style={[styles.content, styles.center]}>Address: {hospitalData.address}</Text>
//     </Page>
//   </Document>
// );

// export default MyDocument;
// pages/pdf.js
'use client'
import { useEffect } from 'react';
import jsPDF from 'jspdf';
import { Document, Page, Text, View, PDFDownloadLink, Image, StyleSheet } from '@react-pdf/renderer';

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

// Component to render PDF
const MyDocument = () => (
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
            <Text>Name: Rainbow Dash</Text>
            <Text>Age: 30</Text>
            <Text>Gender: Female</Text>
            <Text>Weight: 65 kg</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.address}>Date: January 10, 2024</Text>
            <Text>{"\t"}The patient has been diagnosed with <Text style={styles.diagnosis}>Luminous Syndrome</Text>.</Text>
            <Text>Additional notes: The patient is advised to maintain a balanced diet and exercise regularly.</Text>
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
      {/* Alternatively, you can use a button to trigger the download */}
      {/* <button onClick={generatePDF}>Download PDF</button> */}
    </div>
  );
};

export default function PDFPage2() {
  return (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </div>
  );
}
