import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { COLORS } from '../../utils/colors';


function OtpComponent() {
  const [otp, setOtp] = useState('');


  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData('text');
    console.log(data)
  };


  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      onPaste={handlePaste}
      renderSeparator={<span style={{width: 10}}></span>}
      renderInput={(props) => <input {...props} /> }
      inputStyle={{width: "35px", height: "35px", backgroundColor: COLORS.white, color: COLORS.primary, border: `1px solid ${COLORS.gray}`}}
    />
  );
}

export default OtpComponent
