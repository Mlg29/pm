import React from 'react'
import { MdCancel } from "react-icons/md";
import NewDatePicker from '../../components/NewDatePicker/NewDatePicker';
import { useMediaQuery } from 'react-responsive';




function HeaderBox({ calendarDate, setCalendarDate, setTomorrow, status, selectedStatus, setSelectedStatus }) {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'start' : 'center',
                marginBottom: '10px'
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: isMobile ? '20px' : '10px'
            }}>
                {status?.map((aa, i) => {
                    return (
                        <div key={i} style={{ position: 'relative' }}>
                            {calendarDate && aa?.name === calendarDate?.formattedDate && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: -25,
                                        right: 0,
                                        cursor: 'pointer',
                                        fontSize: 12,
                                        color: 'red'
                                    }}
                                    onClick={() => {
                                        setCalendarDate(null)
                                        setTomorrow([])
                                        setSelectedStatus("Live")
                                    }}
                                >
                                    <MdCancel size={25} />
                                </span>
                            )}
                            <p
                                onClick={() => setSelectedStatus(aa?.name)}
                                style={{
                                    width: 80,
                                    padding: "5px 3px",
                                    cursor: 'pointer',
                                    backgroundColor: selectedStatus === aa?.name ? '#2D0D02' : 'white',
                                    color: selectedStatus === aa?.name ? 'white' : '#2d0d02',
                                    marginRight: 4,
                                    textAlign: 'center',
                                    fontSize: 12,
                                    border: "1px solid #2D0D02",
                                    borderRadius: 3
                                }}
                            >
                                {aa?.name}
                            </p>

                        </div>
                    )
                })}
            </div>
            {
                calendarDate ? null : <NewDatePicker calendarDate={calendarDate} isMobile={isMobile} setCalendarDate={setCalendarDate} />
            }
        </div>
    )
}

export default HeaderBox