import ButtonLink from '@/components/button-link'

const Home = () => (
  <main className="min-h-screen flex flex-col justify-center items-center gap-y-5 p-5">
    <div className="flex flex-col items-center">
      <h2 className="text-h2">Map checking</h2>

      <p className="text-secondary-dark">
        Welcome to the Map checking service!
      </p>
    </div>

    <ButtonLink href="/map" text="Open Map" />
  </main>
)

export default Home
