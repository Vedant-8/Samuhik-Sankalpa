import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import random from "../../assets/random.png";

const successStories = [
  {
    text: "Thanks to your contributions, we planted 500 trees this month, helping to combat deforestation.",
    name: "Aarav Patel",
    username: "@AaravPatel_123"
  },
  {
    text: "Your donations helped provide clean drinking water to 30 rural communities.",
    name: "Priya Sharma",
    username: "@PriyaSharma87"
  },
  {
    text: "With your support, we built a new community garden, providing fresh produce to local families.",
    name: "Rohit Kumar",
    username: "@RohitKumar55"
  },
  {
    text: "Over 200 local children learned about sustainability through our educational programs.",
    name: "Sneha Verma",
    username: "@SnehaVerma44"
  },
  {
    text: "Your contributions enabled us to install solar panels in schools, reducing energy costs and carbon emissions.",
    name: "Ishaan Rao",
    username: "@IshaanRao777"
  },
  {
    text: "Thanks to your support, we distributed eco-friendly supplies to 150 families during the winter season.",
    name: "Ananya Gupta",
    username: "@AnanyaGupta123"
  },
  {
    text: "We treated over 100 patients at our free green health clinic, focusing on sustainable health practices.",
    name: "Aditya Singh",
    username: "@Aditya_Singh89"
  },
  {
    text: "Your donations funded a composting program, reducing waste and creating nutrient-rich soil for our community gardens.",
    name: "Meera Reddy",
    username: "@MeeraReddy22"
  },
  {
    text: "With your help, we hosted a tree-planting event, bringing together volunteers and environmentalists.",
    name: "Karan Desai",
    username: "@KaranDesai567"
  },
  {
    text: "Your support allowed us to provide reusable water bottles and eco-friendly bags to over 1,000 students.",
    name: "Neha Joshi",
    username: "@NehaJoshi78"
  },
  {
    text: "We were able to launch a new wildlife conservation project, protecting endangered species in our region.",
    name: "Vikram Nair",
    username: "@VikramNair99"
  },
  {
    text: "Thanks to your generosity, we provided solar-powered lanterns to 200 off-grid families.",
    name: "Radhika Choudhury",
    username: "@RadhikaChoudhury45"
  },
  {
    text: "We hosted an eco-friendly festival, raising awareness about sustainable living in our community.",
    name: "Krishna Mehta",
    username: "@KrishnaMehta123"
  },
  {
    text: "Your donations helped us set up recycling bins in over 50 local schools, encouraging eco-conscious behavior.",
    name: "Simran Kapoor",
    username: "@SimranKapoor56"
  },
  {
    text: "Thanks to you, we introduced a new zero-waste program, helping 100 families reduce their environmental impact.",
    name: "Aarohi Bansal",
    username: "@AarohiBansal12"
  },
  {
    text: "With your support, we constructed a rainwater harvesting system, providing clean water for over 200 people.",
    name: "Ravi Iyer",
    username: "@RaviIyer202"
  },
  {
    text: "Your donations funded a green building initiative, ensuring sustainable housing for 10 local families.",
    name: "Tanvi Shah",
    username: "@TanviShah34"
  },
  {
    text: "Thanks to your generosity, we were able to launch a sustainable farming program, helping 20 families grow their own food.",
    name: "Harshit Kapoor",
    username: "@HarshitKapoor98"
  },
  {
    text: "With your help, we created a green jobs program, offering training to 50 individuals in sustainable industries.",
    name: "Kritika Nair",
    username: "@KritikaNair22"
  },
  {
    text: "Your contributions allowed us to rescue and rehabilitate several endangered species, ensuring a safer future for wildlife.",
    name: "Siddharth Yadav",
    username: "@SiddharthYadav11"
  }
];

const NewsCard = ({ text, name, username }) => (
  <div className="w-[320px] px-6 py-8 bg-white rounded-lg shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl">
    <p className="text-[#5B6469] font-semibold text-[16px]">{text}</p>
    <div className="pt-6 text-[14px] flex items-center gap-2">
      <img src={random} alt="person" className="w-12 h-12 rounded-full border-2 border-[#E0E0E0]" />
      <div>
        <h1 className="font-semibold text-[#333]">{name}</h1>
        <p className="text-[#A4A7B3]">{username}</p>
      </div>
    </div>
  </div>
);

export default function Stories() {
  return (
    <section className="my-16">
      <Container>
        <div className="pt-16 pb-8 h-[750px] overflow-auto bg-[#F7F7F7] flex items-center lg:flex-nowrap flex-wrap gap-4">
          <article className="lg:w-1/2 w-full lg:pb-0 pb-6 flex flex-col lg:items-start items-center lg:ml-16 lg:mt-56">
            <SectionTitle title="Success Stories" />
            <p className="text-[#5B6469] text-lg font-medium">Here’s how your contributions are making a difference.</p>
          </article>
          <div className="flex gap-6 sm:flex-nowrap flex-wrap lg:w-1/2 mx-auto">
            <div className="rounded-md w-full flex flex-col gap-4 items-center">
              {successStories.slice(0, 10).map((story, index) => (
                <NewsCard key={index} text={story.text} name={story.name} username={story.username} />
              ))}
            </div>
            <div className="rounded-md w-full flex flex-col gap-4 items-center">
              {successStories.slice(10).map((story, index) => (
                <NewsCard key={index + 10} text={story.text} name={story.name} username={story.username} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
