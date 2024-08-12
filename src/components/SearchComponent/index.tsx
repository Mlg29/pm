import { CiSearch } from "react-icons/ci";
// @ts-ignore
import { FONTS } from "../../utils/fonts.js";
import { COLORS } from "../../utils/colors.js";
import { IoFilterOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Placeholder } from "react-bootstrap";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

export const styles = {
  container: {
    width: "90%",
    border: "none",
    outline: "none",
    padding: "0px 5px",
    background: "transparent",
  },
  row: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    alignItems: "center",
    padding: "15px 10px",
    borderRadius: 10,
    background: COLORS.secondaryGray,
    margin: "5px 0px 0px 0px",
    border: `0.1px solid ${COLORS.gray}`,
  },
};

function SearchInput(props: any) {
  const {
    placeholder,
    value,
    handleChange,
    allowFilter,
    handleFilterClick,
    disabled,
  } = props;
  const navigate = useNavigate();

  return (
    <div>
      {disabled ? (
        <div
          style={{ margin: "20px 0px", cursor: 'pointer' }}
          onClick={() => navigate("/search")}
        >
          <div style={{ ...styles.row }}>
            <div
              style={{
                margin: "0px 3px 0px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CiSearch
                color={COLORS.primaryGray}
                size={20}
                style={{ cursor: "pointer" }}
              />
            </div>
            <p>{placeholder}</p>
          </div>
        </div>
      ) : (
        <div
          style={{ margin: "20px 0px" }}
        >
          <div style={{ ...styles.row }}>
            <div
              style={{
                margin: "0px 3px 0px 0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CiSearch
                color={COLORS.primaryGray}
                size={20}
                style={{ cursor: "pointer" }}
              />
            </div>
            <input
              value={value}
              style={{
                ...styles.container,
              }}
              placeholder={placeholder}
              onChange={(e) => handleChange(e?.target?.value)}
            />
            {allowFilter ? (
              <IoFilterOutline
                onClick={handleFilterClick}
                size={20}
                style={{ cursor: "pointer" }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchInput;
