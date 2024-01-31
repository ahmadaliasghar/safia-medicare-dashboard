import React from 'react';
import AppointmentForm from './components/AppointmentForm';

const Page = () => {
  return (
    <div style={styles.app}>
      <AppointmentForm />
    </div>
  );
};

export default Page;

const styles = {
  app: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to top, #9796f0, #fbc7d4)',
    minHeight: '100vh',
  },
};
