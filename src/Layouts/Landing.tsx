import Button from "../UI-items/Button"


function Landing() {
  return (
    <section className="bg-amber-400 rounded-3xl mt-2 container">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="capitalize max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            decorative pillowcases velvet
          </h1>
          <p className="max-w-2xl mb-6 font-light text-zinc-700 lg:mb-8 md:text-lg lg:text-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.s natus nobis,ent officia!
          </p>
          <div className="flex gap-6">
            <Button className="bg-white px-5 hover:bg-slate-100 py-2 text-sm rounded-3xl  capitalize">
              buy now
            </Button>

            <Button className="bg-black px-5 hover:bg-zinc-700 py-2 text-sm rounded-3xl text-white capitalize">
              explore more
            </Button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>)
}

export default Landing