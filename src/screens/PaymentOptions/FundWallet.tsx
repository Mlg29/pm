import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import DatePickerComponent from "../../components/DatePickerComponent";
import Button from "../../components/Button";

function FundWallet() {
  const navigate = useNavigate();
  return (
    <div
      className="top-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Header text="Fund Wallet" />
      <div style={{ display: "flex", flexDirection: "column", flex: 5 }}>
        <TextInput
          label="Card Number"
          placeholder="Enter your card number"
          required
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "48%" }}>
            <TextInput label="CVV" placeholder="000" required />
          </div>
          <div style={{ width: "48%" }}>
            <DatePickerComponent
              label="Expiry Date"
              required
              propStyle={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ width: "100%" }}>
          <Button
            text="Submit"
            propStyle={{ width: "100%" }}
            handlePress={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
}

export default FundWallet;
