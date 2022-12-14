import Head from 'next/head'

import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

import { Event } from '../helpers/types'

type Props = {
  data: Event[]
}

export default function HomePage({ data }: Props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot here'/>
      </Head>
      <EventList items={data} />
    </div>
  )
}

export async function getServerSideProps() {
  const data = await getFeaturedEvents()

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { data },
    // revalidate: 2,
  }
}
