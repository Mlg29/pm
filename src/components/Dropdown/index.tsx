

import { FONTS } from "../../utils/fonts"
import { styles } from "./style"



function Dropdown(props: any) {
    const { data, handleSelect, label, placeholder, required } = props
    return (
        <div style={{ ...styles.container,marginBottom: 10 }}>
           <label style={{ ...FONTS.body7 }}>{label} {required ? <span style={{color: "red"}}>*</span> : null}</label>
            <select style={{...styles.select}}>
                <option>{placeholder}</option>
                {
                    data?.map((info: any) => {
                        return <option key={info?.id} value={info?.value}>{info?.value}</option>
                    })
                }

            </select>
        </div>
    )
}

export default Dropdown
