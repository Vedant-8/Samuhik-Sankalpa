import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { how_1, how_2, how_3, how_4 } from "../../assets/home";

const items = [
  {
    id: 1,
    icon: how_1,
    heading: "Register Your Green Initiative",
    text: "Organizations, such as environmental NGOs or green projects, can easily register on the platform to start receiving support from eco-conscious donors.",
  },
  {
    id: 2,
    icon: how_2,
    heading: "Submit Your Environmental Needs",
    text: "Once registered, organizations can submit requests for funds to support resources such as renewable energy projects, tree planting initiatives, eco-friendly infrastructure, or community-based environmental programs.",
  },
  {
    id: 3,
    icon: how_3,
    heading: "Donors Choose to Make an Impact",
    text: "Eco-conscious donors browse through requests and choose how they would like to contribute, whether by donating funds or supporting specific environmental goals.",
  },
  {
    id: 4,
    icon: how_4,
    heading: "Suppliers Help Drive Sustainability",
    text: "The funds are utilized to complete the project and ensure that all processes are carried out with environmental care, supporting sustainability and minimizing ecological impact.",
  },
];


export default function HowItWorks() {
  return (
    <section className="my-14">
      <Container>
        <SectionTitle title="how it works" />
        <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
            {items.map((item) => (
              <div
                className="text-center flex flex-col items-center justify-center"
                key={item.id}
              >
                <img src={item.icon} alt="icon" className="pb-4 w-24" />
                <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
