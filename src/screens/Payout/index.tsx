import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import TextInput from "../../components/TextInput"
import DatePickerComponent from "../../components/DatePickerComponent"
import Button from "../../components/Button"
import Dropdown from "../../components/Dropdown"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { getBankList, verifyBank } from "../../redux/slices/MiscSlice"
import { ToastContainer, toast } from "react-toastify";
import { AccountPayout } from "../../redux/slices/AuthSlice"


function Payout() {
    const navigate = useNavigate()
    const [banks, setBanks] = useState([])
    const [bankId, setBankId] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const dispatch = useAppDispatch()
    const [verifyLoader, setVerifyLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [accountName, setAccountName] = useState("")


    const bankList = banks?.map(dd => {
        return {
            id: dd?.id,
            value: dd?.name
        }
    })
   
    const selectedBank = bankList?.find(aa => aa?.id?.toString() === bankId)
 


    const getAccountDetail = async () => {
        setVerifyLoader(true)
        const payload = {
            accountNumber: accountNumber,
            bankCode: selectedBank?.id?.toString(),
        }
        var response = await dispatch(verifyBank(payload))
        if(verifyBank.fulfilled.match(response)){
            setVerifyLoader(false);
           // setAccountName()
        }
        else {
            var errMsg = response?.payload as string;
            setVerifyLoader(false);
            toast.error(errMsg, {
              position: "bottom-center",
            });
        }
      };
    


    const getBanks = () => {
        dispatch(getBankList()).then(pp => {
            setBanks(pp?.payload?.data)
        })
    }

    useEffect(() => {
        getBanks()
    }, [])




    const handleSubmit = async () => {
        const payload = {
            accountNumber: accountNumber,
            accountName: accountName,
            bankName: selectedBank?.value,
            bankCode: selectedBank?.id,
            branchCode: ""
          }
          setLoader(true);
          var response = await dispatch(AccountPayout(payload))
          if(AccountPayout.fulfilled.match(response)){
              setLoader(false);
             // setAccountName()
          }
          else {
              var errMsg = response?.payload as string;
              setLoader(false);
              toast.error(errMsg, {
                position: "bottom-center",
              });
          }
    }


    return (
        <div className="top-container" style={{ display: "flex", flexDirection: "column" }}>
            <Header
                text="Payout Account"
            />
            <div style={{ display: "flex", flexDirection: "column" }}>

                <Dropdown
                    label="Bank Name"
                    value={bankId}
                    handleSelect={(e) => {
                        setBankId("")
                        setAccountNumber("")
                        return setBankId(e?.target?.value)
                    }}
                    required
                    placeholder="Select Bank Name"
                    data={bankList}

                />

                <TextInput
                    label="Account Number"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    disabled={!selectedBank}
                    onChangeText={(e) => {
                        if(e?.length === 10) {
                            getAccountDetail()
                            return setAccountNumber(e)
                        }
                        else {
                            return setAccountNumber(e)
                        }
                
                       
                    }}
                    required
                />

                <div>
                    {
                        verifyLoader ? <div className="loader" /> :
                        <h5 style={{color: "green", fontSize: 14}}>{accountName}</h5>
                    }
                </div>

                {/* <TextInput
                    label="Amount"
                    placeholder="₦0.00"
                    required
                /> */}

            </div>

            <div style={{ display: "flex", marginTop: 30 }}>
                <div style={{ width: "100%" }}>
                    <Button
                        text="Submit"
                        propStyle={{ width: "100%", backgroundColor: accountNumber?.length !== 10 ?  "gray" : "" }}
                        handlePress={accountNumber?.length !== 10 ? () => {} : () => handleSubmit()}
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Payout
