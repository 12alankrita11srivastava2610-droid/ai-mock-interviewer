import { motion } from "framer-motion";

const stats = [
  {
    number: "10K+",
    label: "Mock Interviews",
  },

  {
    number: "95%",
    label: "Success Rate",
  },

  {
    number: "24/7",
    label: "AI Availability",
  },

  {
    number: "100%",
    label: "Real-Time Feedback",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="bg-black text-white py-24 px-6"
    >

      {/* About Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">

            Revolutionizing Interview Preparation with
            <span className="text-blue-500"> Artificial Intelligence</span>

          </h2>

          <p className="mt-8 text-gray-400 text-lg leading-relaxed">

            Our AI Mock Interviewer helps students and professionals
            practice smarter through intelligent interview simulations,
            personalized feedback, and real-time performance analysis.

          </p>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">

            Whether you're preparing for technical interviews,
            HR rounds, or communication assessments, our AI platform
            provides an immersive learning experience to boost confidence
            and improve interview success rates.

          </p>

        </motion.div>

        {/* Right Stats */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6"
        >

          {stats.map((stat, index) => (

            <motion.div
              key={index}

              whileHover={{ scale: 1.05 }}

              className="bg-white/5 border border-gray-800 backdrop-blur-lg rounded-3xl p-8 text-center shadow-lg hover:border-blue-500 transition duration-300"
            >

              <h3 className="text-4xl font-bold text-blue-500">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-400">
                {stat.label}
              </p>

            </motion.div>

          ))}

        </motion.div>

      </div>

    </section>
  );
};

export default About;