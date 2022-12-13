import { EventDummy } from '../../dummy-data'
import Button from '../ui/button'
import ErrorAlert from '../ui/error-alert'
import EventItem from './event-item'
import classes from './event-list.module.css'

interface IEventList {
  items: EventDummy[]
}

export default function EventList({ items }: IEventList) {
  if (items.length === 0) {
    return (
      <>
        <ErrorAlert>No events found.</ErrorAlert>

        <div className='center'>
          <Button link='./events'>Show all events</Button>
        </div>
      </>
    )
  }
  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <EventItem key={item.id} event={item} />
      ))}
    </ul>
  )
}
