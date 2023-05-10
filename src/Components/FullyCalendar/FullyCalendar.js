import Fullcalendar from "@fullcalendar/react"
import dayGrid from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionplugin from "@fullcalendar/interaction"
import { Modal, Button, Form, Input } from 'antd';
import React, { useState, useRef } from 'react';
import "./full.css"
function Calendar() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const handleDateClick = (info) => {
        setSelectedDate(info.date);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedDate(null);
    };

    const handleModalSubmit = (values) => {
        const newEvent = {
            title: values.title,
            start: selectedDate,
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
                plugins={[dayGrid, timeGridPlugin, interactionplugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                dateClick={handleDateClick}
                events={events}
                editable={true} // Enable event dragging and resizing
                eventDrop={handleEventDrop}
                slotDuration="00:30:00"
                eventRender="name"
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
                    <p>Selected Date: {selectedDate && selectedDate.toDateString()}</p>
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