// // import { getFilteredEvents } from '../../dummy-data'
// import { useRouter } from 'next/router'
// import EventList from '../../components/events/event-list'
// import ResultsTitle from '../../components/events/results-title'
// import ErrorAlert from '../../components/ui/error-alert'
// import { getFilteredEvents } from '../../helpers/api-util'
// import { Event } from '../../helpers/types'
// interface Props {
//   [key: string]: Event[]
// }

// export default function FilteredEventsPage({ data }: Props) {
//   const router = useRouter()

//   const year = +router.query.slug[0]
//   const month = +router.query.slug[1]

//   const date = new Date(year, month - 1)

//   return (
//     <>
//       <ResultsTitle date={date} />
//       <EventList items={data} />
//     </>
//   )
// }

// export async function getServerSideProps(context) {
//   const year = +context.params.slug[0]
//   const month = +context.params.slug[1]
//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2020 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       // notFound: true,
//       redirect: { destination: '/error' },
//     }
//   }
//   const data = await getFilteredEvents({year, month})

//   return {
//     props: { data },
//   }
// }
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Head from 'next/head'

import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'

import { Event } from '../../helpers/types'

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState<Event[]>()
  const router = useRouter()

  // const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, error, isLoading } = useSWR(
    'https://nextjs-course-88039-default-rtdb.europe-west1.firebasedatabase.app/events.json'
  )

  useEffect(() => {
    if (data) {
      const events: Event[] = []

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }

      setLoadedEvents(events)
    }
  }, [data])

  if (isLoading) {
    return <p className='center'>Loading...</p>
  }
  const filterData = router.query.slug
  console.log("🚀 ~ file: [...slug].tsx:89 ~ FilteredEventsPage ~ filterData", filterData)
  if (filterData) {
    const numYear = +filterData[0]
    const numMonth = +filterData[1]

    if (
      isNaN(numYear) ||
      isNaN(numMonth) ||
      numYear > 2030 ||
      numYear < 2021 ||
      numMonth < 1 ||
      numMonth > 12 ||
      error
    ) {
      return (
        <>
          <Head>
            <title>No events found</title>
            <meta name='description' content='Find a lot here' />
          </Head>
          <ErrorAlert>
            <p>Invalid filter. Please adjust your values!</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </>
      )
    }

    const filteredEvents = loadedEvents?.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getFullYear() === numYear &&
        eventDate.getMonth() === numMonth - 1
      )
    })

    if (!filteredEvents || filteredEvents.length === 0) {
      return (
        <>
          <Head>
            <title>No events found</title>
            <meta name='description' content='Find a lot here' />
          </Head>
          <ErrorAlert>
            <p>No events found for the chosen filter!</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </>
      )
    }

    const date = new Date(numYear, numMonth - 1)

    return (
      <>
        <Head>
          <title>Filtered Events</title>
          <meta name='description' content='Find a lot here' />
        </Head>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </>
    )
  }
}
