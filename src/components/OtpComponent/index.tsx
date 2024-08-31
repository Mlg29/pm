import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { COLORS } from '../../utils/colors';
import { InputOtp } from 'primereact/inputotp';

function OtpComponent({otp, setOtp}: any) {
  

  const handleOtpChange = (val) => {

    if(val?.length === 7){
      return;
    }
    setOtp(val)
  }


  return (
    <InputOtp 
      value={otp} 
      onChange={(e) => handleOtpChange(e?.value)} 
      mask
      integerOnly
      length={6}
      variant='filled'
 
    />

  );
}

export default OtpComponent
