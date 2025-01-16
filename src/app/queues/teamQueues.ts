import Queue from "bull";
import { createTeamInDatabase } from "@/app/services/teamServices"; // Function to create team in DB

// Initialize the queue
const teamQueue = new Queue("team-creation", {
  redis: {
    host: "127.0.0.1", // Redis host
    port: 6379, // Redis port
  },
});

// Process jobs
teamQueue.process(async (job) => {
  const { userId } = job.data;
  console.log(`Creating team for userId: ${userId}`);

  try {
    const team = await createTeamInDatabase(userId); // Call your team creation logic
    console.log(`Team created for userId: ${userId}`);
    return team;
  } catch (error) {
    console.error(`Failed to create team for userId: ${userId}`, error);
    throw error; // Let Bull retry the job if it fails
  }
});

// Error handling
teamQueue.on("failed", (job, err) => {
  console.error(`Job failed for userId: ${job.data.userId}`, err);
});

export default teamQueue;
