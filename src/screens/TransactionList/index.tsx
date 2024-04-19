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

function TransactionList() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<any>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFilterClick = () => {
    handleShow();
  };

  const handleTypeCheck = (val: any) => {
    if (selected?.includes(val)) {
      const filt = selected?.filter((a: any) => a !== val);
      setSelected(filt);
    } else {
      setSelected([...selected, val]);
    }
  };

  const types = [
    {
      id: 1,
      name: "All Type",
      icons: selected?.includes("all") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("all")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("all")} />
      ),
    },
    {
      id: 2,
      name: "Deposit",
      icons: selected?.includes("deposit") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("deposit")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("deposit")} />
      ),
    },
    {
      id: 3,
      name: "Win Credit",
      icons: selected?.includes("credit") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("credit")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("credit")} />
      ),
    },
    {
      id: 4,
      name: "Withdrawal",
      icons: selected?.includes("withdrawal") ? (
        <FaCheckSquare
          size={20}
          onClick={() => handleTypeCheck("withdrawal")}
        />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("withdrawal")} />
      ),
    },
    {
      id: 5,
      name: "Bet Debit",
      icons: selected?.includes("debit") ? (
        <FaCheckSquare size={20} onClick={() => handleTypeCheck("debit")} />
      ) : (
        <FaRegSquare size={20} onClick={() => handleTypeCheck("debit")} />
      ),
    },
  ];

  return (
    <div className="top-container">
      <Header text="Transactions" />
      <SearchComponent
        placeholder="Search transactions by amount and id"
        allowFilter
        handleFilterClick={handleFilterClick}
      />

      <TransactionCard
        text="Deposit - 2DE3I2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />
      <TransactionCard
        text="Withdrawal - NI2..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
      />
      <TransactionCard
        text="Win Credit - 2DE2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />
      <TransactionCard
        text="Deposit - 2DE3I2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />
      <TransactionCard
        text="Withdrawal - NI2..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
      />
      <TransactionCard
        text="Win Credit - 2DE2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />
      <TransactionCard
        text="Deposit - 2DE3I2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />
      <TransactionCard
        text="Withdrawal - NI2..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
      />
      <TransactionCard
        text="Win Credit - 2DE2k..."
        amount="₦ 20,000"
        date="24 July, 2022. 10:40pm"
        incoming
      />

      <Modal show={show} onHide={handleClose}>
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
            <DatePickerComponent
              label="Transaction Date Range"
              propStyle={{ width: "100%" }}
            />
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Button text="Apply Filter" propStyle={{ width: "100%" }} />
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
  );
}

export default TransactionList;
