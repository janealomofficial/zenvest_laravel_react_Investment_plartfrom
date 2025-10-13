import React from "react";

const testimonials = [
  {
    id: 1,
    text: "Prisma streamlined our investment process and provided top-tier results. The platform’s intuitive interface and responsive customer support made the whole experience seamless.",
    name: "Marvin McKinney",
    title: "Simply.io",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    text: "We saw immediate improvements in our portfolio performance after switching to Prisma. The guidance, integrated tools, and customizable investment options are unmatched in the industry.",
    name: "Jenny Wilson",
    title: "Mailadoo",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    text: "The integration capabilities that Prisma offers have made managing our investments more efficient than ever. I’m impressed with the level of detail and thoughtfulness put into their services.",
    name: "Esther Howard",
    title: "Digital Ocean",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    id: 4,
    text: "Prisma’s platform offers everything we need for secure and informed investment decisions. Their easy-to-use dashboard and comprehensive features exceeded our expectations.",
    name: "Ronald Richards",
    title: "Simply.io",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    id: 5,
    text: "Working with Prisma has been a game changer for our asset management. Their modern approach to crypto investments allowed us to optimize our returns effortlessly.",
    name: "Guy Hawkins",
    title: "Digital Ocean",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    id: 6,
    text: "Prisma’s comprehensive tools have enhanced our investment strategy, giving us confidence in our financial growth. Their analytics and intuitive interface make tracking progress easy.",
    name: "Courtney Henry",
    title: "Simply.io",
    image: "https://randomuser.me/api/portraits/women/53.jpg",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto text-center px-6">
        <p className="text-sm text-purple-400 uppercase tracking-widest mb-4">
          Cases
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Our success client stories
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600 transition duration-300"
            >
              <p className="text-gray-300 text-sm mb-6">“{item.text}”</p>

              <div className="flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-400/50"
                />
                <div className="text-left">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
