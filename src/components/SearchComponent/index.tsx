// @ts-ignore
import { styles } from "./style.js"
import { CiSearch } from "react-icons/ci";
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"
import { COLORS } from "../../utils/colors.js";

function SearchInput(props: any) {
    const { placeholder, value, handleChange } = props

    return (
        <div style={{ margin: "20px 0px" }}>
            <div style={{ ...styles.row }}>
                <div style={{ margin: "0px 3px 0px 0px", display: "flex", justifyContent: 'center' }}>
                    <CiSearch color={COLORS.primaryGray} size={20} />
                </div>
                <input
                    value={value}
                    style={{
                        ...styles.container

                    }}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e?.target?.value)}
                />

            </div>

        </div>
    )
}

export default SearchInput
