import { motion } from "framer-motion";

import {
  FaRobot,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={40} />,
    title: "AI Mock Interviews",
    description:
      "Practice realistic AI-powered interview sessions tailored for technical and HR rounds.",
  },

  {
    icon: <FaComments size={40} />,
    title: "Instant Feedback",
    description:
      "Receive intelligent feedback on communication, confidence, grammar, and technical accuracy.",
  },

  {
    icon: <FaChartLine size={40} />,
    title: "Performance Analytics",
    description:
      "Track interview history, scores, strengths, and improvement areas with detailed analytics.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-black text-white py-24 px-6"
    >

      {/* Section Heading */}
      <div className="text-center mb-20">

        <h2 className="text-4xl md:text-5xl font-bold">
          Powerful AI Features
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Everything you need to prepare smarter,
          improve faster, and crack your dream interviews.
        </p>

      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {features.map((feature, index) => (

          <motion.div
            key={index}

            initial={{ opacity: 0, y: 50 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5, delay: index * 0.2 }}

            viewport={{ once: true }}

            whileHover={{ scale: 1.05 }}

            className="bg-white/5 border border-gray-800 backdrop-blur-lg rounded-3xl p-8 shadow-lg hover:border-blue-500 transition duration-300"
          >

            <div className="text-blue-500 mb-6">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
};

export default Features;