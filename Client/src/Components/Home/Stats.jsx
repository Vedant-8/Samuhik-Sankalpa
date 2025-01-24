export default function Stats() {
  return (
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-4 grid-cols-2 gap-4 sm:w-9/12 w-11/12 mx-auto -mt-8 px-4">
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">3.5M+</h1>
        <p>Lives Positively Impacted</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">500+</h1>
        <p>Organisations</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">20000+</h1>
        <p>Donors</p>
      </div>
      <div>
        <h1 className="md:text-[40px] text-[25px] font-bold">₹80 CR+</h1>
        <p>Funds Raised</p>
      </div>
    </section>
  );
}
