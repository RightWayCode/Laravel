export default function AboutUs() {
  return (
    <div className="text-gray-800 bg-white">
      <section className="relative px-6 py-24 text-white bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="container mx-auto text-center">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">About Clothify</h1>
          <p className="max-w-2xl mx-auto text-lg opacity-90">
            Where fashion meets comfort. Learn about our journey, values, and what makes us your go-to fashion destination.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="container grid items-center gap-12 mx-auto md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
            <p className="leading-relaxed text-gray-700">
              Clothify was born out of a desire to bring trend-forward, high-quality fashion to everyone. We believe style should be
              accessible, effortless, and expressive. From humble beginnings in a small studio to a thriving global brand,
              our passion for fashion has only grown stronger.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/600x400?text=Our+Story"
            alt="Our Story"
            className="shadow-lg rounded-xl"
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="container mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">What We Stand For</h2>
          <p className="max-w-xl mx-auto mb-12 text-gray-600">
            Quality. Integrity. Sustainability. These values define every piece we craft and every experience we create.
          </p>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🌱", title: "Eco-Friendly", desc: "We prioritize sustainable materials and practices." },
              { icon: "💎", title: "Premium Quality", desc: "Our fabrics and fit are tailored to last and impress." },
              { icon: "🤝", title: "Community First", desc: "Giving back is in our DNA, from charity collabs to local support." }
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 text-left transition bg-white shadow-md rounded-xl hover:shadow-xl"
              >
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-indigo-600">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center text-white bg-indigo-600">
        <h2 className="mb-4 text-3xl font-bold">Join Our Fashion Movement</h2>
        <p className="max-w-lg mx-auto mb-6 text-white/80">
          From everyday basics to standout pieces — discover a new way to express your style.
        </p>
        <a
          href="/shop"
          className="inline-block px-6 py-3 font-semibold text-indigo-600 transition bg-white rounded-full shadow hover:bg-gray-100"
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
}