import { getFilteredEvents } from '../../dummy-data'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import ErrorAlert from '../../components/ui/error-alert'

export default function FilteredEventsPage() {
  const router = useRouter()
  const filterData = router.query.slug
  if (!filterData) {
    return <h2 className='centered'>Loading...</h2>
  }
  const year = +router.query.slug[0]
  const month = +router.query.slug[1]

  const filteredEvents = getFilteredEvents({ year, month })

  const date = new Date(year, month-1)

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month < 1 ||
    month > 12
  ) {
    return <ErrorAlert>Wrong data</ErrorAlert>
  }


  return (
    <>
      <ResultsTitle date={date}/>
      <EventList items={filteredEvents} />
    </>
  )
}
