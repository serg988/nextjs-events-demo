import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import EventList from '../../components/events/event-list'
import EventSearch from '../../components/events/events-search'
import { getAllEvents } from '../../dummy-data'

interface Event {
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

export default function AllEventsPage({ dataStat }: Props) {
  // console.log("🚀 ~ file: index.tsx:21 ~ AllEventsPage ~ dataStat", dataStat)

  function transformToArray(dat) {
    const eventsArr = []

      for (const key in dat)
        eventsArr.push({
          id: key,
          date: dat[key].date,
          location: dat[key].location,
          description: dat[key].description,
          image: dat[key].image,
          title: dat[key].title,
          isFeatured: dat[key].isFeatured,
        })
      return eventsArr

  }
  const eventsStat = transformToArray(dataStat)
  console.log("🚀 ~ file: index.tsx:41 ~ AllEventsPage ~ eventsStat", eventsStat)

  const [eventsFetched, setEventsFetched] = useState<Event[]>(eventsStat)
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json',
    fetcher
  )
  useEffect(() => {
    const eventsFetched = transformToArray(data) ;
    setEventsFetched(eventsFetched)
  }, [data])

  const router = useRouter()

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`
    router.push(fullPath)
  }
  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={eventsFetched} />
    </div>
  )
}

export async function getStaticProps() {
  const url =
    'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  const res = await fetch(url)
  const dataStat = await res.json()

  if (!dataStat) {
    return {
      notFound: true,
    }
  }
  return {
    props: { dataStat }, // will be passed to the page component as props
    // revalidate: 2,
  }
}

// 'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json'
