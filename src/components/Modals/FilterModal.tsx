import React, { useState } from "react";
import TransactionCard from "../../components/TransactionCard";
import { Modal } from "react-bootstrap";
import { FaRegSquare } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import Button from "../../components/Button";


function FilterModal({show, selected, handleClose, handleTypeCheck}) {
   const [check, setCheck] = useState("")
  

  const handlePress = async () => {
    await handleTypeCheck(check)
    handleClose()
  }
  
   

    const types = [
        {
          id: 1,
          name: "All Bets",
          icons: check === "all" ? (
            <FaCheckSquare size={20} onClick={() => setCheck("all")}  style={{cursor: "pointer"}}/>
          ) : (
            <FaRegSquare size={20} onClick={() => setCheck("all")} style={{cursor: "pointer"}} />
          ),
        },
        {
          id: 2,
          name: "Multi Currency Bets",
          icons: check === "multi" ? (
            <FaCheckSquare size={20} onClick={() => setCheck("multi")}  style={{cursor: "pointer"}}/>
          ) : (
            <FaRegSquare size={20} onClick={() => setCheck("multi")} style={{cursor: "pointer"}} />
          ),
        },
        {
          id: 3,
          name: "Same Currency Bets",
          icons: check === "same" ? (
            <FaCheckSquare size={20} onClick={() => setCheck("same")} style={{cursor: "pointer"}} />
          ) : (
            <FaRegSquare size={20} onClick={() => setCheck("same")} style={{cursor: "pointer"}} />
          ),
        },
      ];


  return (
    <div>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ ...FONTS.body6, marginBottom: "10px" }}>
            Bet Type
          </p>

          <div>
            {types?.map((data) => {
              return (
                <div
                  key={data?.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "15px 0px",
                    borderBottom: `1px solid ${COLORS.semiGray}`,
                  }}
                >
                  {data?.icons}
                  <h3 style={{ ...FONTS.body6, margin: "0px 10px" }}>
                    {data?.name}
                  </h3>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "20px" }}>
        
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button text="Apply Filter"  handlePress={() => handlePress()} propStyle={{ width: "100%" }} />
            </div>
            <div style={{ width: "100%", margin: "20px 0px" }}>
              <Button
                text="Clear Filter"
                propStyle={{
                  width: "100%",
                  backgroundColor: COLORS.cream,
                  color: COLORS.primary,
                }}
                handlePress={() => handleClose()}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default FilterModal
