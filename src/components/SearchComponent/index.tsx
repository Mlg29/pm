// @ts-ignore
import { styles } from "./style.js"
import { CiSearch } from "react-icons/ci";
// @ts-ignore
import { FONTS } from "../../utils/fonts.js"
import { COLORS } from "../../utils/colors.js";
import { IoFilterOutline } from "react-icons/io5";

function SearchInput(props: any) {
    const { placeholder, value, handleChange, allowFilter, handleFilterClick } = props

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
                {
                    allowFilter ? <IoFilterOutline onClick={handleFilterClick}  size={20}/> : null
                }
                
            </div>

        </div>
    )
}

export default SearchInput
