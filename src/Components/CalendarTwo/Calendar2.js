import { Calendar, Modal, Form, Input, Button, TimePicker } from 'antd';
import { useState } from 'react';
function EventCalendar() {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  const handleEventSubmit   = (values) => {
    const newEvent = {
      title: values.title,
      date: selectedDate.format('YYYY-MM-DD'),
      startTime: values.startTime.format('HH:mm'),
      endTime: values.endTime.format('HH:mm'),
    };
    setEvents([...events, newEvent]);
    setModalVisible(false);
  };

  const handleEventDragStart = (event) => {
    setDraggedEvent(event);
  };

  const handleEventDragEnd = () => {
    setDraggedEvent(null);
  };
  const handleDeleteEvent = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
  };
  const handleEventDrop = (date) => {
    const updatedEvents = events.map((event) => {
      if (event === draggedEvent) {
        return {
          ...event,
          date: date.format('YYYY-MM-DD'),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Modal
        title="Create Event"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleEventSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input  placeholder='Enter title here'/>
          </Form.Item>
          <Form.Item name="description" label="description" rules={[{ required: true }]}>
            <Input  placeholder='Enter a description'/>
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Calendar 
        dateCellRender={(date) => (
          <div>
            {events.map((event) => {
              if (event.date === date.format('YYYY-MM-DD')) {
                return (
                  <div style={{
                    backgroundColor:"blue",
                    color:"#fff"
                  }}
                    key={event.title}
                    draggable
                    onDragStart={() => handleEventDragStart(event)}
                    onDragEnd={handleEventDragEnd}
                  >
                    <button onClick={() => handleDeleteEvent(event)}>edit</button>
                    {event.startTime} - {event.endTime}: {event.title}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
        onSelect={(date) => {
          setSelectedDate(date);
          setModalVisible(true);
        }}
        onDrop={handleEventDrop}
        onDragOver={(e) => e.preventDefault()}
      />
    </div>
  );
}

export default EventCalendar;

  
  
  
  