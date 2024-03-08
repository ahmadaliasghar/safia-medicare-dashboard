import React from 'react';
import { Box, Fade, Modal as MuiModal, Typography, Divider, TextField, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import styled from "styled-components";
import { MdPayment, MdOutlineEdit } from "react-icons/md"
import { HiOutlineMail } from "react-icons/hi"

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: any;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  bgcolor: '#fff',
  maxHeight: "90vh",
  boxShadow: 24,
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, eventData }) => {
  console.log(eventData,"data onevent")
  let startDay = "";
  let startDate = "";
  let startTime = "";
  let timeDifference = "";

  if (eventData) {
    // Extracting information from the eventData
    const start = new Date(eventData?.start);
    startDay = start.toLocaleDateString("en-US", { weekday: "long" }); // Get the full name of the day of the week
    startDate = start.toLocaleDateString(); // Get the date in the format MM/DD/YYYY
    startTime = start.toLocaleTimeString(); // Get the start time in the format HH:MM:SS
    const end = new Date(eventData._instance?.range?.end);
    const duration = (end.getTime() - start.getTime()) / 60000; // Calculate the duration in minutes
    timeDifference = duration.toFixed(2);
  }
  return (
    <MuiModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <ModalInside>
            {eventData && (
              <>
                <ModalHead>
                  <h2>{eventData.title} </h2>
                  <Divider sx={{ my: 1, mt: 2, borderColor: "white" }} />
                  <p className="appointment-detail">
                    {startDay} {startDate} <span style={{ opacity: "0.5" }}>at</span> {startTime} <span style={{ opacity: "0.5" }}>for</span> {timeDifference} minutes{" "}
                  </p>
                </ModalHead>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                </Typography>

                <ModalBody>
                  <div className="model-body-main">
                    <div className="model-body-left">
                      <p className="patient-name">haris</p>
                      <p><HiOutlineMail style={{ color: "#007fa3ff" }} size={14} />Haris@gmail.com</p>
                      <p className="head">Case</p>
                      <p>None</p>
                      <p className="head">Next Appointment</p>
                      <p>None</p>
                      <p className="head">Forms</p>
                      <p>None</p>
                    </div>
                    <div className="model-body-right">
                      <TextField value="Arrived" />
                      <TextField value="Did Not Arrive" />
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <MdPayment style={{ color: "#007fa3ff" }} size={16} />
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Add a payment"
                      />
                      <OutlinedInput
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton edge="end">
                              <MdOutlineEdit style={{ color: "#007fa3ff" }} size={20} />
                            </IconButton>
                          </InputAdornment>
                        }
                        placeholder="Add Treatment Note"
                      />
                    </div>
                  </div>
                </ModalBody>
                <div className="model-body-footer">
                  <div className="footer-right">
                    <CloseButton style={{ borderRadius: "4px 0 0 4px" }} > Book another</CloseButton>
                    <CloseButton style={{ borderRadius: 0 }} >Reschedule</CloseButton>
                    <CloseButton style={{ borderRadius: 0 }} >Edit</CloseButton>
                    <CloseButton style={{ borderRadius: "0 4px 4px 0" }}>Cancel</CloseButton>
                  </div>
                </div>
              </>
            )}
          </ModalInside>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export default Modal;

const ModalHead = styled.div`
  background-color: #003049;
  min-height: 8vh;
  color: white;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  
  h2 {
    font-family: "Roboto Slab", serif;
    font-size: 1.2rem;
    line-height: 1.875rem;
    margin: 0;
    font-weight: 300;
  }
  .patient-name-head {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.1rem;
  }
  p {
    margin: 0;
    font-size: 15px;
  }
  .appointment-detail {
    font-size: 13px;
  }
`;
const ModalBody = styled.div`
  padding: 20px;
  padding-bottom: 3vh;
`;
const ModalInside = styled.div`
  background-color: #fff;
  width: 500px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  .model-body-main {
    display: flex;
    flex-direction: row;
  }
  .model-body-left {
    width: 50%;
  }
  .model-body-right {
    width: 50%;
    display: flex;
    gap: 2%;
    flex-direction: column;
  }
  .head {
    margin-top: 0.8em;
    color: #007fa3ff;
    font-weight: 600;
  }
  .patient-name {
    font-size: 16px;
    color: grey;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .model-body-footer {
    display: flex;
    padding: 2%;
    justify-content: space-between;
    background-color: #003049;
  }
  p {
    margin-block-end: 0;
    margin-block-start: 0;
  }
  .MuiOutlinedInput-input {
    padding: 8px 6px;
    font-size: 14px;
  }
`;
const CloseButton = styled.button`
  background-color: white;
  color: black;
  border: 1px solid black;
  white-space: nowrap;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #007fa3ff;
    color:white;
  }
`;