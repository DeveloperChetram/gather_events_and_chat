import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-10 lg:px-16">
      <header className="flex items-center justify-between border-b border-slate-200 pb-6">
        <Link className="text-lg font-semibold tracking-tight text-slate-950" href="/">
          Gather<span className="text-amber-500">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <a className="hidden transition-colors hover:text-slate-950 sm:block" href="#events">
            Events
          </a>
          <a className="rounded-full bg-slate-950 px-4 py-2 text-white transition-colors hover:bg-amber-500" href="#create">
            Create event
          </a>
        </nav>
      </header>

      <section className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Make room for good company</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-7xl">
            The best moments start with a plan.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Bring the details together, keep everyone in the loop, and make your next gathering feel effortless.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a className="rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-500" href="#create">
              Plan an event
            </a>
            <a className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:border-slate-950 hover:text-slate-950" href="#events">
              View upcoming events
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] bg-[#dce8df] p-6 sm:p-10">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-300/70" />
          <div className="relative rounded-2xl bg-[#fffdf7] p-6 shadow-[0_20px_50px_rgba(31,45,37,0.12)] sm:p-8">
            <div className="flex items-start justify-between border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Next up</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Sunday supper</h2>
              </div>
              <span className="rounded-full bg-[#f8e4b1] px-3 py-1 text-xs font-semibold text-amber-900">18 guests</span>
            </div>
            <div className="space-y-5 py-6 text-sm text-slate-600">
              <p><span className="mr-3 text-base">01</span> Sunday, October 18 · 6:30 PM</p>
              <p><span className="mr-3 text-base">02</span> The Greenhouse, Brooklyn</p>
              <p><span className="mr-3 text-base">03</span> Bring your favorite dessert</p>
            </div>
            <a className="block rounded-xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-amber-500" href="#events">
              Open event details
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
