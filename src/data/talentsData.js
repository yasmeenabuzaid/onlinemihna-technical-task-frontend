export const generateTalents = () => {
  const roles = ['Frontend Developer', 'Backend Developer', 'Fullstack Engineer', 'UI/UX Designer', 'DevOps Engineer'];
  const skills = ['React', 'Node.js', 'Next.js', 'Python', 'AWS', 'MUI', 'TypeScript'];
  
  return Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Talent Name ${i + 1}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    experience: `${Math.floor(Math.random() * 8) + 1} Years`,
    skills: [skills[Math.floor(Math.random() * skills.length)], skills[Math.floor(Math.random() * skills.length)]],
    availability: 'Remote / Full-time'
  }));
};

export const allTalents = generateTalents();
