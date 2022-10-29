import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { Moment } from 'moment'
import { FC, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { rules } from '../utils/rules'

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

export const EventForm: FC<EventFormProps> = (props) => {
    const [event, setEvent] = useState<IEvent>({host: '', guest: '', date: '', description: ''} as IEvent);
    const {user} = useTypedSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: date.format('YYYY-MM-DD')})
        }
    }

    const submitForm = () => {
        props.submit({...event, host: user.username})
    }
    
    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event description"
                name="description"
                rules={[rules.required()]}
            >
                <Input value={event.description} onChange={e => setEvent({...event, description: e.target.value})} />
            </Form.Item>
            <Form.Item
                label="Event date"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker onChange={date => selectDate(date)} />
            </Form.Item>
            <Form.Item
                label="Choose a guest"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map(guest =>
                        <Select.Option value={guest.username} key={guest.username}>{guest.username}</Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Row justify='end'>
                <Form.Item style={{marginBottom: 0}}>
                    <Button type='primary' htmlType='submit'>
                        Create
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}
