import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the report
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  section: {
    marginBottom: 10
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  content: {
    fontSize: 12,
    marginBottom: 5
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  diagnosis: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10
  },
  divider: {
    borderBottom: '1 solid #000000',
    marginBottom: 10
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  center: {
    textAlign: 'center'
  }
});

// Dummy data for hospital, doctor, and patient
const hospitalData = {
  name: "Example Hospital",
  address: "123 Main St, City, Country",
  logo: "https://via.placeholder.com/150",
};

const doctorData = {
  name: "Dr. John Smith",
  address: "456 Oak St, City, Country",
  contact: "123-456-7890",
  specialty: "Cardiology"
};

const patientData = {
  firstName: "Jane",
  lastName: "Doe",
  age: 45,
  gender: "Female",
  contact: "987-654-3210",
  diagnosis: "Hypertension"
};

// Define the patient report structure
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.flexRow}>
          <View>
            <Image style={styles.logo} src={hospitalData.logo} />
            <Text style={styles.header}>{hospitalData.name}</Text>
            <Text style={styles.content}>Report #: 123</Text>
            <Text style={styles.content}>Date: {new Date()}</Text>
          </View>
          <View>
            <Text style={styles.subheader}>Doctor Information</Text>
            <Text style={styles.content}>Name: {doctorData.name}</Text>
            <Text style={styles.content}>Address: {doctorData.address}</Text>
            <Text style={styles.content}>Contact: {doctorData.contact}</Text>
            <Text style={styles.content}>Specialty: {doctorData.specialty}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Patient Information</Text>
        <Text style={styles.content}>Name: {patientData.firstName} {patientData.lastName}</Text>
        <Text style={styles.content}>Age: {patientData.age}</Text>
        <Text style={styles.content}>Gender: {patientData.gender}</Text>
        <Text style={styles.content}>Contact: {patientData.contact}</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subheader}>Diagnosis</Text>
        <View style={styles.diagnosis}>
          <Text style={styles.content}>Condition: {patientData.diagnosis}</Text>
          <Text style={styles.content}>Details: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante eu lectus posuere suscipit. Fusce vitae posuere magna. In hac habitasse platea dictumst. Donec euismod, mauris vel semper luctus, odio tellus consequat arcu, vitae vestibulum justo mi id dolor. Duis varius ut nisi sed lobortis. Ut eget lorem ex. Duis auctor risus velit, et dapibus massa mattis id. Nullam aliquet, libero a dictum feugiat, libero eros vehicula eros, nec vehicula ligula purus at lorem. Aliquam vitae purus felis. Aliquam scelerisque tempor dapibus.</Text>
        </View>
      </View>
      <Text style={[styles.content, styles.center]}>Address: {hospitalData.address}</Text>
    </Page>
  </Document>
);

export default MyDocument;
