"use client"
import { motion } from "framer-motion";
import { Brain, Language, Planet } from 'iconoir-react';
import { features, Feature } from "../../constants";

export default function FeaturesSection() {
  const iconComponents = {
    Brain: Brain,
    Language: Language,
    Planet: Planet
  };

  return (
    <section className="py-20 relative px-2 sm:px-0">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg uppercase tracking-[0.75rem] text-center mb-16 text-[#FCFCFC]"
        >
          the Lunark AI
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature: Feature, index: number) => {
            const IconComponent = iconComponents[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative p-[1px] rounded-2xl h-full"
              >
                <div className="absolute inset-0 rounded-2xl bg-[#888]/30" />
                <div className="relative rounded-2xl bg-[#000] overflow-hidden h-full">
                  <div 
                    className="flex items-end justify-start pl-4 w-full h-[250px] bg-cover bg-center hover:bg-cover hover:bg-center"
                    style={{
                      backgroundImage: `url('${feature.bannerImage}')`,
                    }}
                  >
                    <div className="relative z-10 mb-4">
                      <IconComponent className="w-8 h-8 text-[#FCFCFC]" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="relative z-10 text-xl mb-4 text-[#FCFCFC] uppercase tracking-[0.25rem]">{feature.title}</h3>
                    <p className="relative z-10 text-[#5e8284]">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}