import React, { useState } from 'react';
import "./Calendar.css"
import { Button, Modal, Select } from "antd"
function Calendar() {
  const [currendate, setcurrentdate] = useState(new Date())
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [today,settoday] = useState(new Date())
  const [open,setopen] = useState(false)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const handlePrevMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
  };
  const handleNextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
  };
  let  modaopen = ()=>{ 
    setopen(true)
  }
  let oncancelmodal = () =>{
    setopen(false)
  }
  let onok = () =>{
    setopen(false)
  }
  const openmodal = () =>{
    setopen(true)
  }
  return (
    <div className="calendar">
      <div className='main'>
        <h1>Calendar App</h1>
        <Modal open={open} onOk={onok} onCancel={oncancelmodal}>
        </Modal>
        <Select placeholder="Weeks">
        {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </Select>
        <div className="header">
          <Button onClick={handlePrevMonth} type="primary">{"<"}</Button><br/>
          <h2>{new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2><br/>
          <Button onClick={handleNextMonth} type="primary">{">"}</Button>
        </div>
        <div className="days">
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="dates">
          {[...Array(firstDay).fill(null), ...Array(daysInMonth).keys()].map((date, index) => (
            <div key={index} className={date === null ? 'empty' : 'date'}>
              <Button className={currendate.get} type={index === today.getDate()  ? "primary" : "default" } style={{
              }}> {date !== null && date + 1}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
