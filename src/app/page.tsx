import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-5xl font-bold text-center">
        Build Apps Without Code
      </h1>
      <p className="mt-4 text-xl text-gray-500 text-center max-w-xl">
        The easiest way for small businesses to create apps — no coding needed.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/sign-up"
          className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
        >
          Get Started Free
        </Link>
        <Link
          href="/sign-in"
          className="border border-black px-6 py-3 rounded-lg text-lg hover:bg-gray-100"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
