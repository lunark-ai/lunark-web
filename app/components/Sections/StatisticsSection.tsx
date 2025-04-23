"use client"
import { motion } from "framer-motion";
import { baseContainerStyle } from '@/constants';

export default function StatisticsSection() {
  const statistics = [
    { value: "—", label: "Transactions" },
    { value: "—", label: "Enterprise Clients" },
    { value: "—", label: "Annotations" }
  ];

  return (
    <section className="py-20 relative px-2 sm:px-0">
      <div className="max-w-6xl mx-auto">
        <div className={`p-8`}>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                <div className="text-4xl text-[#FCFCFC] mb-2">{stat.value}</div>
                <div className="text-[#5e8284]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}