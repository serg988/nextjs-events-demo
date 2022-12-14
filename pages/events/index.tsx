import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import EventList from '../../components/events/event-list'
import EventSearch from '../../components/events/events-search'
import { getAllEvents } from '../../helpers/api-util'

export interface Event {
  id: string
  date: string
  location: string
  description: string
  image: string
  title: string
  isFeatured: boolean
}
interface Props {
  [key: string]: Event
}

export function transformToArray(dat) {
  const eventsArr = []

  for (const key in dat)
    eventsArr.push({
      id: key,
      ...dat[key],
    })
  return eventsArr
}

export default function AllEventsPage({ dataStat }: Props) {
  const eventsStat = transformToArray(dataStat)

  const [eventsFetched, setEventsFetched] = useState<Event[]>(eventsStat)
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcher
  )
  useEffect(() => {
    const eventsFetched = transformToArray(data)
    setEventsFetched(eventsFetched)
  }, [data])

  const router = useRouter()

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Find a lot here' />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={eventsFetched} />
    </div>
  )
}

export async function getStaticProps() {
  
  const dataStat = await getAllEvents()

  if (!dataStat) {
    return {
      notFound: true,
    }
  }
  return {
    props: { dataStat }, 
    revalidate: 1800,
  }
}

// 'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json'
