import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

const NewDatePicker = ({ calendarDate, setCalendarDate, isMobile }) => {


    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        if (!date) return;

        const selectedDate = date.toDate();
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        const difference = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        const relativeDate = difference === 0 ? "d0" : `d${difference}`;

        const formattedDate = dayjs(selectedDate).format("DD-MM-YYYY");

        if (relativeDate !== "d0") {
            setCalendarDate({ index: relativeDate, formattedDate });
        }
    };



    return (
        <div style={{ marginTop: -8, width: isMobile ? "100%" : "" }}>

            <DatePicker
                format="DD/MM/YYYY"
                allowClear
                onChange={handleDateChange}
                style={{ width: '100%' }}
                disabledDate={(current) =>
                    current && (current < dayjs().subtract(8, 'day') || current > dayjs().add(7, 'day'))
                }
            />

        </div>
    );
};

export default NewDatePicker;
