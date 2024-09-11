'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import ScoobyImg from "../../images/Scooby.jpg"
import KipImg from "../../images/Kip.jpg"
import EnzoImg from "../../images/Enzo.jpg"
import MouseImg from "../../images/Mouse.jpg"
//import loadingSVG from "../../images/loading.svg";

const petData = [
  { id:1, name: "Scooby", gender: "M", age: "15Y", img: ScoobyImg },
  { id:2,name: "Kip", gender: "F", age: "6Y", img: KipImg },
  { id:3, name: "Enzo", gender: "M", age: "6Y", img: EnzoImg },
  { id:4, name: "Mouse", gender: "M", age: "5Y", img: MouseImg },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Home() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-row h-[5vh] text-white justify-center text-4xl font-[family-name:var(--font-geist-sans)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Ashwin Sridhar&apos;s pack
      </motion.div>

      <div className="grid items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 w-screen gap-8"
          variants={containerVariants}
        >
          {petData.map((pet, index) => (
            <motion.div 
              key={pet.name} 
              className="col-span-1 flex flex-col items-center"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href={'/dogs/'+ pet.id}>
                <Image 
                  src={pet.img} 
                  alt={pet.name} 
                  className="h-80 w-80 border-gray-500 border-solid border-2 shadow-gray-400 shadow-2xl" 
                />
                </a>
              </motion.div>
              <motion.p 
                className="text-white text-center text-2xl mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {`${pet.name}, ${pet.gender}, ${pet.age}`}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.footer 
          className="row-start-3 flex gap-6 flex-col items-center justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <p className="text-center text-white text-2xl">The pack endorses Ashwin for Fitbark!</p>
          <p className="text-center text-white">This project is a demonstration created to showcase relevant skills for the engineer role at Fitbark by Ashwin Sridhar</p>
          <p className="text-center text-white">Tech: ReactJS, NextJS, Typescript, Framer motion, Tailwindcss, NodeJS, WS, ExpressJS, REST API, AWS EC2, Docker, AWS RDS MySQL, CI/CD, Python</p>
          <motion.a 
            href="https://www.ashsridhar.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <p className="text-cyan-400 text-xl">ashsridhar.com</p>
          </motion.a>
          <motion.a 
            href="https://www.packculture.in"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <p className="text-cyan-400 text-xl">packculture.in</p>
          </motion.a>
        </motion.footer>
      </div>
    </motion.div>
  );
}