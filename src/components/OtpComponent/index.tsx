import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { COLORS } from '../../utils/colors';
import { InputOtp } from 'primereact/inputotp';

function OtpComponent({otp, setOtp}: any) {
  




  return (
    <InputOtp 
      value={otp} 
      onChange={(e) => setOtp(e.value)} 
      mask
      length={6}
    />

  );
}

export default OtpComponent
