import EventContent from '../../components/event-detail/event-content'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import ErrorAlert from '../../components/ui/error-alert'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import { Event } from '../../helpers/types'

interface Props {
  [key: string]: Event
}

export default function EventDetailPage({ event }: Props) {
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  )
}

export async function getStaticProps(context) {
  console.log(
    '🚀 ~ file: [eventId].tsx:43 ~ getServerSideProps ~ context',
    context.params
  )

  const event = await getEventById(context.params.eventId)

  if (!event) {
    return {
      notFound: true,
    }
  }
  return {
    props: { event },
    revalidate: 60,
  }
}
export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return { paths: paths, fallback: 'blocking' }
}
