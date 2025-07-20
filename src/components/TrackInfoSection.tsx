'use client'

import { motion } from 'framer-motion'

export default function TrackInfoSection() {
  const features = [
    {
      title: "Street Course",
      description: "Navigate through urban obstacles, rails, and ledges designed to challenge every skill level."
    },
    {
      title: "Bowl Section",
      description: "Deep concrete bowls for vert skating and aerial tricks. Perfect for advanced riders."
    },
    {
      title: "Beginner Area",
      description: "Safe learning environment with smaller ramps and obstacles for newcomers."
    },
    {
      title: "Community Events",
      description: "Regular competitions, workshops, and meetups bringing skaters together."
    }
  ]

  const stats = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Events Yearly" },
    { number: "10K+", label: "Photos Shared" },
    { number: "24/7", label: "Open Access" }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Track Info */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            THE TRACK
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our state-of-the-art concrete park features diverse terrain for every style of skating. 
            From technical street sections to flowing bowls, we've created the ultimate playground 
            for the skateboarding community.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="bg-black text-white py-16 px-8 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              COMMUNITY IMPACT
            </h2>
            <p className="text-gray-300 text-lg">
              Numbers that tell our story
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            JOIN THE MOVEMENT
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We're more than just a skate park. We're a community that supports creativity, 
            progression, and the pure joy of skateboarding. Every session, every trick, 
            every fall and every make - it all matters here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 transition-colors duration-300">
              VISIT US TODAY
            </button>
            <button className="border-2 border-black text-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
