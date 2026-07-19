import { motion } from 'motion/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fallbackSkillsData = [
  { name: 'Logo Design', progress: 95 },
  { name: 'Brand Identity', progress: 90 },
  { name: 'Flyer Design', progress: 95 },
  { name: 'Social Media Design', progress: 90 },
  { name: 'Business Cards', progress: 100 },
  { name: 'Print Design', progress: 85 },
  { name: 'Adobe Photoshop', progress: 95 },
  { name: 'Adobe Illustrator', progress: 90 },
  { name: 'CorelDRAW', progress: 85 },
  { name: 'Figma', progress: 80 },
];

export default function Skills() {
  const { data: skills = [] } = useQuery({
    queryKey: ['public-skills'],
    queryFn: async () => {
      const res = await axios.get('/api/skills');
      return res.data;
    }
  });

  const displaySkills = skills.length > 0 ? skills : fallbackSkillsData;

  return (
    <section id="skills" className="py-24 bg-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-deeppurple mb-4">My Skills</h2>
          <p className="text-lg text-olive">
            A showcase of my technical expertise and creative capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          {displaySkills.map((skill: any, idx: number) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(idx * 0.1, 1) }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-deeppurple">{skill.name}</span>
                <span className="text-sm font-medium text-olive-dark">{skill.progress}%</span>
              </div>
              <div className="w-full h-2 bg-ivory-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-olive to-deeppurple rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
