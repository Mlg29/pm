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
import { AccountPayout, getUserPayout } from "../../redux/slices/AuthSlice"


function Payout() {
    const navigate = useNavigate()
    const [banks, setBanks] = useState([])
    const [bankId, setBankId] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const dispatch = useAppDispatch()
    const [verifyLoader, setVerifyLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountDetail, setAccountDetail] = useState(null)


    const getUserAccountDetail = () => {
        dispatch(getUserPayout()).then(pp => {
            console.log({pp})
        })
    }

    const bankList = banks?.map(dd => {
        return {
            id: dd?.id,
            value: dd?.name
        }
    })
   
    const selectedBank = bankList?.find(aa => aa?.id?.toString() === bankId)
 

    const getAccountDetail = async (num) => {
        setVerifyLoader(true)
        const payload = {
            accountNumber: num,
            bankCode: selectedBank?.id?.toString(),
        }
        var response = await dispatch(verifyBank(payload))
        if(verifyBank.fulfilled.match(response)){
            setVerifyLoader(false);
            setAccountName(response?.payload?.data?.data?.account_name)
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
        getUserAccountDetail()
    }, [])




    const handleSubmit = async () => {
        const payload = {
            accountNumber: accountNumber,
            accountName: accountName,
            bankName: selectedBank?.value,
            bankCode: selectedBank?.id?.toString(),
            branchCode: ""
          }
          setLoader(true);
          var response = await dispatch(AccountPayout(payload))
          if(AccountPayout.fulfilled.match(response)){
              setLoader(false);
              toast.error(response?.payload?.data?.message, {
                position: "bottom-center",
              });
              getUserAccountDetail()
             setTimeout(() => {
                navigate("/home")
             }, 1000);
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
                    data={bankList?.filter(bb => bb?.value === "Access Bank")}

                />

                <TextInput
                    label="Account Number"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    disabled={!selectedBank}
                    onChangeText={(e) => {
                        if(e?.length === 10) {
                            getAccountDetail(e)
                            return setAccountNumber(e)
                        }
                        else {
                            setAccountName("")
                            return setAccountNumber(e)
                        }
                
                       
                    }}
                    required
                />

                <div>
                    {
                        verifyLoader ? <div className="loader2" /> :
                        <h5 style={{color: "green", fontSize: 14}}>{accountName}</h5>
                    }
                </div>

                {/* <TextInput
                    label="Amount"
                    placeholder="₦0.00"
                    required
                /> */}

            </div>
            <ToastContainer />
            <div style={{ display: "flex", marginTop: 30 }}>
                <div style={{ width: "100%" }}>
                    <Button
                        text="Submit"
                        isLoading={loader}
                        propStyle={{ width: "100%", backgroundColor: accountNumber?.length !== 10 ?  "gray" : "" }}
                        handlePress={accountNumber?.length !== 10 ? () => {} : () => handleSubmit()}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default Payout
