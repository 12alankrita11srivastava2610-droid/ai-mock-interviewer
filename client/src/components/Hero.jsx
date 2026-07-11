import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white min-h-screen flex items-center justify-center px-6">

      {/* Gradient Blur Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 opacity-20 blur-3xl rounded-full"></div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl"
      >

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">

          Ace Your Next

          <span className="text-blue-500"> AI Interview</span>

        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed">

          Practice mock interviews powered by Artificial Intelligence
          and receive real-time feedback on your communication,
          technical knowledge, and confidence.

        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition duration-300 shadow-lg shadow-blue-500/30">

            Start Interview

          </button>

          <button className="border border-gray-700 hover:border-blue-500 px-8 py-4 rounded-xl text-lg transition duration-300">

            Learn More

          </button>

        </div>

      </motion.div>

    </section>
  );
};

export default Hero;