import { redirect } from 'next/navigation'

// The wall TV just opens the host root; send it straight to the dashboard.
export default function Home() {
  redirect('/tv')
}
