import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import key from "../../assets/images/key.svg"
import lock from "../../assets/images/lock.svg"
import scan from "../../assets/images/finger-scan.svg"
import { FONTS } from "../../utils/fonts"
import arrowright from "../../assets/images/arrow-right.svg"
import Form from 'react-bootstrap/Form';





const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        padding: "1rem 0px"
    }
}

function Security() {
    const navigate = useNavigate()

    const dataList = [
        {
            id: 1,
            name: "Biometrics",
            image: scan,
            handleRoute: () => navigate("/biometrics")
        },
        {
            id: 2,
            name: "Change Password",
            image: lock,
            handleRoute: () => navigate("/fund-wallet")
        },
        {
            id: 3,
            name: "Change PIN",
            image: key,
            handleRoute: () => navigate("/fund-wallet")
        }
    ]


  return (
    <div className='top-container'>
      <Header 
        text="Security"
      
      />

<div>
                {
                    dataList?.map((data: any) => {
                        return <div key={data?.id} style={{ ...styles.row }} onClick={data?.handleRoute}>
                            <img src={data?.image}  />
                            <div onClick={data?.handleRoute} style={{ margin: "0px 10px", width: "100%" }}>
                                <h3 style={{ ...FONTS.body6, margin: "0px" }}>{data?.name}</h3>
                            </div>
                            {/* {
                                data?.name === "Biometrics" ?  <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                style={{ transform: 'scale(1.7)' }}
                              />
                              :  <img src={arrowright} />
                            } */}
                          <img src={arrowright} />
                        </div>
                    })
                }
            </div>
    </div>
  )
}

export default Security
