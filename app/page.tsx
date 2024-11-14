import PopularAnime from "@/components/anime/PopularAnime";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Miru</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track, discover, and share your favorite anime series
          </p>
        </section>

        <section className="space-y-8">
          <PopularAnime />
        </section>
      </div>
    </main>
  );
}
