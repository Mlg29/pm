import React, { useState } from "react";
import Header from "../../components/Header";
import SearchComponent from "../../components/SearchComponent";
import TransactionCard from "../../components/TransactionCard";
import { Modal } from "react-bootstrap";
import { FaRegSquare } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FONTS } from "../../utils/fonts";
import { COLORS } from "../../utils/colors";
import DatePickerComponent from "../../components/DatePickerComponent";
import Button from "../../components/Button";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import EmptyState from "../../components/EmptyState";

function TransactionList() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<any>([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [value, setValue] = useState('')
  const location = useLocation();
  const transactions = location.state.transactions;
  const userData = location.state.userData;


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFilterClick = () => {
    handleShow();
  };

  const handleTypeCheck = (val: any) => {
    const bb = ["ALL", "BET_CREDIT", "BET_DEBIT", "DEPOSIT", "WITHDRAW"]
    if (val === "ALL") {
      if (selected === bb) {
        setSelected([])
      }
      else {
        setSelected(["ALL", "BET_CREDIT", "BET_DEBIT", "DEPOSIT", "WITHDRAW"])
      }

    }
    else if (selected?.includes(val)) {
      const filt = selected?.filter((a: any) => a !== val);
      setSelected(filt);
    }
    else if (!selected) {
      setSelected([val])
    }
    else {
      setSelected([...selected, val]);
    }
  };

  const handleChange = (event) => {
    setSelected([])
    setValue(event)
  }

  const applyFilter = () => {
    setValue("")
    handleClose()
  }
  const closeFilter = () => {
    setSelected([])
    handleClose()
  }

  const types = [
    {
      id: 1,
      name: "All Type",
      type: "ALL",
      icons: selected?.includes("ALL") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("ALL")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("ALL")} />
      ),
    },
    {
      id: 2,
      name: "Deposit",
      type: "DEPOSIT",
      icons: selected?.includes("DEPOSIT") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("DEPOSIT")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("DEPOSIT")} />
      ),
    },
    {
      id: 3,
      name: "Bet Credit",
      type: "BET_CREDIT",
      icons: selected?.includes("BET_CREDIT") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("BET_CREDIT")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("BET_CREDIT")} />
      ),
    },
    {
      id: 4,
      name: "Withdraw",
      type: "WITHDRAW",
      icons: selected?.includes("WITHDRAW") ? (
        <FaCheckSquare
          size={20}
          onClick={() => handleTypeCheck("WITHDRAW")}
        />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("WITHDRAW")} />
      ),
    },
    {
      id: 5,
      name: "Bet Debit",
      type: "BET_DEBIT",
      icons: selected?.includes("BET_DEBIT") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("BET_DEBIT")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("BET_DEBIT")} />
      ),
    },
  ];


  const filterSearch = selected?.length > 0 ? transactions.filter((t) => selected?.includes(t.type)) : transactions?.filter((a) => a?.amount.toString().includes(value) || a?.id?.toLowerCase().includes(value) || selected?.includes(a?.type))



  return (
    <div className="top-container">
      {isMobile && <Header text="Transactions" />}

      <SearchComponent
        placeholder="Search transactions by amount or id"
        allowFilter
        value={value}
        handleChange={(e) => handleChange(e)}
        handleFilterClick={handleFilterClick}
      />

      {filterSearch
        ?.map((data, i) => {
          return (
            <div key={i}>
              <TransactionCard
                text={`${data?.type} - ${data?.id}`}
                amount={data?.amount}
                date={data?.createdAt}
                type={data?.type}
                userData={userData}
              />
            </div>
          );
        })}

      {
        filterSearch?.length < 1 && <div style={{ marginTop: "-8rem" }}>
          <EmptyState
            header={"No Transaction Available"}
          />
        </div>

      }

      <Modal show={show} onHide={closeFilter}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ ...FONTS.body6, marginBottom: "10px" }}>
            Transaction Type
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
              <Button handlePress={() => applyFilter()} text="Apply Filter" propStyle={{ width: "100%" }} />
            </div>
            <div style={{ width: "100%", margin: "20px 0px" }}>
              <Button
                text="Clear Filter"
                propStyle={{
                  width: "100%",
                  backgroundColor: COLORS.cream,
                  color: COLORS.primary,
                }}
                handlePress={() => closeFilter()}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TransactionList;
