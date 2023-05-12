import Fullcalendar from "@fullcalendar/react"
import dayGrid from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionplugin from "@fullcalendar/interaction"
import multiMonthYear from "@fullcalendar/multimonth"
import listPlugun from "@fullcalendar/list"
import { Modal, Button, Form, Input } from 'antd';
import React, { useState,  } from 'react';
function Calendar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("")
    const [events, setEvents] = useState([]);
    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr);
        setModalVisible(true);
    };
    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedDate("");
    };
    const handleModalSubmit = (values) => {
        const newEvent = {
            title: values.title,
            start: selectedDate,
            end:values.endtime,
            allDay : false
        };
        setEvents([...events, newEvent]);
        handleModalCancel();
    };
    const handleEventDrop = (info) => {
        const { event, oldEvent } = info;
        if (!event || !event.start || !event.end) return;

        const updatedEvent = {
            ...event,
            start: event.start instanceof Date ? event.start.toISOString() : event.start,
            end: event.end instanceof Date ? event.end.toISOString() : event.end,
        };

        const updatedEvents = events.map((e) => (e.id === oldEvent.id ? updatedEvent : e));
        setEvents(updatedEvents);
    };
    return (
        <div>
            <Fullcalendar
                plugins={[dayGrid, timeGridPlugin, interactionplugin,multiMonthYear,listPlugun]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear,listWeek",
                }}
                dateClick={handleDateClick}
                events={events}
                editable={true} 
                eventDrop={handleEventDrop}
                // eventRender="name"
                dayMaxEventRows={true}
            />
            <Modal
                title="Create Event"
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <Form onFinish={handleModalSubmit}>
                    <Form.Item
                        name="title"
                        label="Event Title"
                        rules={[{ required: true, message: 'Please enter the event title' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Calendar;