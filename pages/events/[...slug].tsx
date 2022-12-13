// import { getFilteredEvents } from '../../dummy-data'
import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import ErrorAlert from '../../components/ui/error-alert'
import { getFilteredEvents } from '../../helpers/api-util'
import { Event } from '../../helpers/types'
interface Props {
  [key: string]: Event[]
}

export default function FilteredEventsPage({ data }: Props) {
  const router = useRouter()

  const year = +router.query.slug[0]
  const month = +router.query.slug[1]

  const date = new Date(year, month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={data} />
    </>
  )
}

export async function getServerSideProps(context) {
  const year = +context.params.slug[0]
  const month = +context.params.slug[1]
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2020 ||
    month < 1 ||
    month > 12
  ) {
    return {
      // notFound: true,
      redirect: { destination: '/error' },
    }
  }
  const data = await getFilteredEvents({year, month})

  return {
    props: { data },
  }
}
