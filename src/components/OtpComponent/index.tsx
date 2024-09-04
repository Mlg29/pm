import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { COLORS } from '../../utils/colors';
import { InputOtp } from 'primereact/inputotp';
import { useNavigate } from 'react-router-dom';

function OtpComponent({otp, setOtp}: any) {
  const navigate = useNavigate()

  const handleOtpChange = (val) => {

    if(val?.length === 7){
      return;
    }
    setOtp(val)
  }


  return (
   <div>
     <InputOtp 
      value={otp} 
      onChange={(e) => handleOtpChange(e?.value)} 
      mask
      integerOnly
      length={6}
      variant='filled'
 
    />
    <p style={{textAlign: 'center', marginTop: 30, cursor: 'pointer'}} onClick={() => navigate("/request-pin")}>Forgot Pin?</p>
   </div>

  );
}

export default OtpComponent
