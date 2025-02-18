import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);

  const services = [
    {
      img: "https://didmdw8v48h5q.cloudfront.net/wp-content/uploads/2023/01/Quiz_-Which-Destination-Country-Should-I-Study-Abroad-In.png",
      text: "Study Abroad",
      pg: "Explore best study packages with us",
    },
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2022/7/FE/CC/BX/62175184/placement-consultancy-in-india-placement-agencies-in-india-accord-consultants-interview-tips.png",
      text: "Job Consultancy",
      pg: "You want to set your carrier we have wide opportunities",
    },
    {
      img: "https://lorien.finance/blog/wp-content/uploads/2024/10/Education-Loan-for-Abroad-Studies.jpg",
      text: "Visiting Visa",
      pg: "Curabitur vehicula urna sit amet neque luctus, at efficitur .",
    },
    
  ];

  const animationSides = ["fade-left", "fade-right", "fade-up", "fade-down"];

  return (
    <div className="container mx-auto p-12">
      <h2 className="text-3xl font-bold text-start mb-10 text-teal-500 font-space-grotesk ">
        Our Services
      </h2>
      <hr />
      <div className="mt-5">
        <h1 className="text-4xl mb-9 xl:mb-[13vh] font-bold">
          <span className="text-teal-500 ">Delivering Assistance</span> Immigration
          Services <br />
          & Study <span className="text-teal-500">Abroad</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 xl:gap-x-12 gap-y-[6vh]">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden transition-shadow duration-300"
            data-aos={animationSides[index % animationSides.length]}
          >
            <div className="flex items-center justify-start mb-4 relative">
              <img
                src={service.img}
                alt={service.text}
                className="w-46 h-60 object-cover rounded-sm"
              />
            </div>
            <div className="bg-teal-400 text-white relative w-80 lg:w-64 xl:w-80 h-36 bottom-12 p-3 opacity-80">
              <h3 className="text-xl font-semibold text-white mb-4 font-space-grotesk">
                {service.text}
              </h3>
              <p className="text-gray-100 text-xs mb-6 font-space-grotesk">{service.pg}</p>
              <button className="flex items-center justify-start gap-2 font-space-grotesk text-white px-4 transition-colors duration-300 border-b border-bg-white">
                Contact now <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;