import { Calendar } from 'antd'
import { Moment } from 'moment'
import { FC } from 'react'
import { IEvent } from '../models/IEvent'

interface EventCalendarProps {
    events: IEvent[]
}

export const EventCalendar: FC<EventCalendarProps> = (props) => {
    const dateCellRender = (value: Moment) => {
        const formatedData = value.format('YYYY-MM-DD');
        const currentDayEvents = props.events.filter(ev => ev.date === formatedData);
        return (
            <div>
                {currentDayEvents.map((ev, index) => 
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        );
    };

    return (
        <Calendar dateCellRender={dateCellRender} />
    )
}