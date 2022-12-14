import { Event } from '../../pages/events'
import AddressIcon from '../icons/address-icon'
import ArrowRightIcon from '../icons/arrow-right-icon'
import DateIcon from '../icons/date-icon'
import Button from '../ui/button'
import Image from 'next/image'

import classes from './event-item.module.css'

interface IEventItem {
  event: Event
}

export default function EventItem({ event }: IEventItem) {
  const humanReadableDate = new Date(event.date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const formattedDate = event.location.replace(', ', '\n')
  const exploreLink = `/events/${event.id}`
  return (
    <li className={classes.item}>
      <Image className={classes.img} src={event.image} alt={event.title} width={250} height={160}/>
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.address}>
          <AddressIcon />
          <address>{formattedDate}</address>
        </div>

        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  )
}
