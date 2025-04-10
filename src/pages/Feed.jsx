// import { useAuth } from "../context/AuthContext";
// import Card from "../components/Card";
// import { motion } from "framer-motion";

// const Feed = () => {
//   const { user } = useAuth();

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.15,
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     }),
//   };

//   const cards = [
//     {
//       title: "Browse Marketplace",
//       desc: "Buy and sell stuff with other students",
//       to: "/marketplace",
//     },
//     {
//       title: "Join Study Groups",
//       desc: "Connect, chat, and collaborate",
//       to: "/study_groups",
//     },
//     {
//       title: "Book a Tutor",
//       desc: "Find help from your peers",
//       to: "/tutoring/request",
//     },
//     {
//       title: "Leave a Review",
//       desc: "Share your course and instructor experiences",
//       to: "/courses",
//     },
//   ];

//   return (
//     <div className="p-7">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="text-center text-3xl font-extrabold text-primary mb-10"
//       >
//         {user.first_name}'s Feed
//       </motion.h1>

//       <div className="flex flex-col gap-10">
//         {cards.map((card, i) => (
//           <motion.div
//             key={card.to}
//             custom={i}
//             initial="hidden"
//             animate="visible"
//             variants={cardVariants}
//           >
//             <Card {...card} />
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;
import React from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import { motion } from "framer-motion";

/**
 * FeedPage component:
 * Renders a list of quick-access cards for student features (e.g., Marketplace, Study Groups).
 */
function FeedPage() {
  const { user } = useAuth();

  const cardMotionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // List of features to display as cards
  const feedOptions = [
    {
      title: "Browse Marketplace",
      description: "Buy and sell study materials with other students",
      linkTo: "/marketplace",
    },
    {
      title: "Join Study Groups",
      description: "Connect, chat, and collaborate with peers",
      linkTo: "/study_groups",
    },
    {
      title: "Book a Tutor",
      description: "Find help from your peers",
      linkTo: "/tutoring/request",
    },
    {
      title: "Leave a Review",
      description: "Share your course and instructor experiences",
      linkTo: "/courses",
    },
  ];

  return (
    <div className="p-7">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center text-3xl font-extrabold text-primary"
      >
        {user?.first_name}'s Feed
      </motion.h1>

      <div className="flex flex-col gap-10">
        {feedOptions.map((option, index) => (
          <motion.div
            key={option.linkTo}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardMotionVariants}
          >
            <Card
              title={option.title}
              desc={option.description}
              to={option.linkTo}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;
