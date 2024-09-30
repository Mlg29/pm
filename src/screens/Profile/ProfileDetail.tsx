import Button from "../../components/Button";
import Header from "../../components/Header";
import profile from "../../assets/images/profile1.png";
import male from "../../assets/images/male.svg";
import female from "../../assets/images/female.svg";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import trash from "../../assets/images/trash.svg";
import { useNavigate } from "react-router-dom";
import { FlexDirection } from "../../utils/type";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import EditProfileModal from "../../components/Modals/EditProfileModal";
import { useAppDispatch } from "../../redux/hooks";
import { getUserData, terminateAccount } from "../../redux/slices/AuthSlice";
import moment from "moment";
import { MdPrivacyTip } from "react-icons/md";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import TextInput from "../../components/TextInput";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    flex: 1,
    height: "100%",
    padding: "16px",
  },
  center: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0px",
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${COLORS.semiGray}`,
    padding: "30px 0px 10px 0px",
  },
  trash: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "2rem 0px",
  },
};

function ProfileDetail() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useAppDispatch() as any;
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [deleteData, setDeleteData] = useState(false)
  const [password, setPassword] = useState("")


  const fetchUserInfo = async () => {
    const response = await dispatch(getUserData());
    if (getUserData.fulfilled.match(response)) {
      setUserData(response?.payload);
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    fetchUserInfo();
  }, []);

  const handleClose = () => {
    setDeleteData(false)
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const handleShowEdit = () => setShowEdit(true);


  const handleDelete = async () => {
    if(!password){
      toast.error("Password is required", {
        position: "bottom-center",
      });
      return
    }
   
    const payload = {
     password: password,
    }
    setLoader(true);
    var response = await dispatch(terminateAccount(payload))
    if(terminateAccount.fulfilled.match(response)){
        setLoader(false);
        localStorage.clear()
        setDeleteData(false)
        navigate("/home")

    }
    else {
        var errMsg = response?.payload as string;
        setLoader(false);
        toast.error(errMsg, {
          position: "bottom-center",
        });
    }
  }

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
    <div style={{ ...styles.container }}>
      {isMobile && <Header text="Profile" />}

      <div style={{ display: "flex", flexDirection: "column", flex: 5 }}>
        <div style={{ ...styles.center }}>
          {userData?.profileImage ? (
            <img
              src={userData?.profileImage}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
              }}
              alt=""
            />
          ) : userData?.gender === "male" ? (
            <img src={male} />
          ) : (
            <img src={female} />
          )}
          <h3 style={{ ...FONTS.h5, margin: "5px 0px" }}>
            {userData?.firstName} {userData?.lastName}
          </h3>
          <p
            style={{
              ...FONTS.body7,
              backgroundColor: COLORS.semiGray,
              padding: 10,
              borderRadius: 30,
            }}
          >
            @{userData?.userName}
          </p>
        </div>

        <div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>First Name</p>
            <h3 style={{ ...FONTS.h6 }}>{userData?.firstName}</h3>
          </div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>Last Name</p>
            <h3 style={{ ...FONTS.h6 }}>{userData?.lastName}</h3>
          </div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>Date of Birth</p>
            <h3 style={{ ...FONTS.h6 }}>
              {moment(userData?.dob).format("ll")}
            </h3>
          </div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>Phone Number</p>
            <h3 style={{ ...FONTS.h6 }}>{userData?.phoneNumber}</h3>
          </div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>Email</p>
            <h3 style={{ ...FONTS.h6 }}>{userData?.email}</h3>
          </div>
          <div style={{ ...styles.row }}>
            <p style={{ ...FONTS.body6 }}>Gender</p>
            <h3 style={{ ...FONTS.h6 }}>
              {userData?.gender ? userData?.gender : "N/A"}
            </h3>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "15px",
          backgroundColor: COLORS.cream,
          marginBottom: "10px",
        }}
      >
        <MdPrivacyTip size={30} style={{ paddingRight: "5px" }} />
        <p style={{ ...FONTS.body7 }}>
          We don't share your personal details with anyone. This information is
          required solely for verification.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {isMobile ? (
          <Button
            text="Edit Account"
            handlePress={() => navigate("/edit-profile")}
          />
        ) : (
          <Button text="Edit Account" handlePress={() => handleShowEdit()} />
        )}
      </div>

      <div style={{ ...styles.trash }} onClick={() => handleShow()}>
        <img src={trash} style={{ opacity: 0.5 }} />
        <h3
          style={{
            ...FONTS.h6,
            color: COLORS.red,
            margin: "0px 0px 0px 10px",
            cursor: "pointer",
            opacity: 0.5,
          }}
        >
          Delete Account
        </h3>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body>
          <p style={{ ...FONTS.h6, marginBottom: "10px", textAlign: "center" }}>
            Delete Account
          </p>
          <p
            style={{
              ...FONTS.body6,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            You won’t be able to access your data again once you delete your
            account.
          </p>

          <div>
          <TextInput
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    type="password"
                    onChangeText={(e) => setPassword(e) }
                    required
                />
          </div>

          <div style={{ marginTop: "20px" }}>
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button
                text={deleteData ? "Yes, Delete my account" : "Delete"}
                propStyle={{
                  width: "100%",
                  backgroundColor: COLORS.red,
                  color: COLORS.white,
                }}
               handlePress={deleteData ? () => handleDelete() : () => setDeleteData(true)}
              />
            </div>
            <div style={{ width: "100%", margin: "20px 0px" }}>
              <Button
                text="Cancel"
                propStyle={{
                  width: "100%",
                  backgroundColor: COLORS.white,
                  color: COLORS.primary,
                  border: `1px solid ${COLORS.primary}`,
                }}
                handlePress={() => handleClose()}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <EditProfileModal
        show={showEdit}
        handleClose={() => {
          fetchUserInfo();
          setShowEdit(false);
        }}
      />
         <ToastContainer />
    </div>
  );
}

export default ProfileDetail;
