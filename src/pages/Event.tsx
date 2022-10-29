import { Button, Layout, Modal, Row } from 'antd'
import React, { FC, useState, useEffect } from 'react'
import { EventCalendar } from '../components/EventCalendar'
import { EventForm } from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

export const Event: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {fetchGuests, createEvent, fetchEvents} = useActions();
    const {guests, events} = useTypedSelector(state => state.event);
    const {username} = useTypedSelector(state => state.auth.user)

    useEffect(() => {
        fetchGuests();
        fetchEvents(username);
    })

    const addNewEvent = (event: IEvent) => {
        setIsModalOpen(false);
        createEvent(event);
    }

    return (
        <Layout className='main'>
            <EventCalendar events={events} />
            <Row justify='center'>
                <Button onClick={() => setIsModalOpen(true)}>Add an event</Button>
            </Row>
            <Modal
                title={'Add an Event'}
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
            >
                <EventForm guests={guests} submit={addNewEvent} />
            </Modal>
        </Layout>
    )
}