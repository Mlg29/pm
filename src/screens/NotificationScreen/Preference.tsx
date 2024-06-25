import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import key from "../../assets/images/key.svg"
import lock from "../../assets/images/lock.svg"
import scan from "../../assets/images/finger-scan.svg"
import { FONTS } from "../../utils/fonts"
import arrowright from "../../assets/images/arrow-right.svg"
import Form from 'react-bootstrap/Form';
import Button from "../../components/Button"
import { useMediaQuery } from "react-responsive"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { getUserData, updateUserData } from "../../redux/slices/AuthSlice"
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader"




const styles = {
    row: {
        display: "flex",
        alignItems: "center",
        padding: "1rem 0px"
    }
}

function Preference() {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const [loaderBtn, setLoaderBtn] = useState(false);
    const [loader, setLoader] = useState(false);
    const dispatch = useAppDispatch() as any;


    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (e) => {
        const { id, checked} = e.target;
        setCheckedItems({
          ...checkedItems,
          [id]: checked,
        });
      };


    const fetchUserInfo = async () => {
        const response = await dispatch(getUserData());
        if (getUserData.fulfilled.match(response)) {
          setCheckedItems({
            betEvents: response?.payload?.betEvents,
            betChallenges: response?.payload?.betChallenges,
            followOpponents: response?.payload?.followOpponents,
            maintenance: response?.payload?.maintenance,
            announcements: response?.payload?.announcements
          })
        }
        setLoader(false)
      };
    
      useEffect(() => {
        setLoader(true)
        fetchUserInfo();
      }, []);

    const dataList = [
        {
            id: "betEvents",
            name: "Bet Events",

        },
        {
            id: "betChallenges",
            name: "Bet Challenge",
        },
        {
            id: "followOpponents",
            name: "Follow opponent’s game",
        },
        {
            id: "maintenance",
            name: "Maintenance",
        },
        {
            id: "announcements",
            name: "Announcement",
        }
    ]


    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
      };

    const handleSubmit = async () => {

        if(isEmpty(checkedItems)){
            return;
        }
    
        setLoaderBtn(true);
        try {
          var response = await dispatch(updateUserData(checkedItems));
    
          if (updateUserData.fulfilled.match(response)) {
            setLoaderBtn(false);
            fetchUserInfo();
            toast.success("Notification Updated Successfully", {
              position: "bottom-center",
            });
          } else {
            var errMsg = response?.payload as string;
            setLoaderBtn(false);
            toast.error(errMsg, {
              position: "bottom-center",
            });
          }
        } catch (err) {}
      };


       
    if (loader) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            height: "50vh",
          }}
        >
          <Loader />
        </div>
      );
    }

    return (
        <div className='top-container'>
            {
                isMobile &&  <Header
                text="Notification"

            />
            }
           

            <div style={{ display: "flex", flexDirection: 'column', flex: 5 }}>
                {
                    dataList?.map((data: any) => {
                        return <div key={data?.id} style={{ ...styles.row }}>
                            <div style={{ margin: "0px 10px", width: "100%" }}>
                                <h3 style={{ ...FONTS.body6, margin: "0px" }}>{data?.name}</h3>
                            </div>
                            <Form.Check // prettier-ignore
                                type="switch"
                                style={{ transform: 'scale(1.7)' }}
                                key={data.id}
                                id={data.id}
                                label={data.label}
                                disabled={data?.id === "maintenance" || data?.id === "announcements"}
                                checked={checkedItems[data.id] || false}
                                onChange={handleChange}
                                className="custom-checkbox"
                            />

                        </div>
                    })
                }
            </div>

            <div style={{ display: "flex", flexDirection: 'column', flex: 1 }}>
               {
                !isMobile && <div style={{marginTop: 10}} />
               }
                <div style={{ width: "100%" }}>
                   {
                    isMobile ?  <Button
                    text="Save"
                    isLoading={loaderBtn}
                    propStyle={{ width: "100%" }}
                    handlePress={() => handleSubmit()}
                   // handlePress={() => navigate('/secret-question')}
                />
                :
                <Button
                text="Save"
                isLoading={loaderBtn}
                propStyle={{ width: "100%" }}
                handlePress={() => handleSubmit()}
              //  handlePress={() => navigate('/secret-question')}
            />
                   }
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Preference
