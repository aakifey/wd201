const { Todo } = require("./models");

async function seedData() {
  try {
    // Clear existing data and reset auto-increment
    await Todo.truncate({ restartIdentity: true });

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Calculate dates for yesterday and tomorrow
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    // Add sample todos
    const sampleTodos = [
      {
        title: "Pay electricity bill",
        dueDate: yesterdayStr,
        completed: false,
      },
      {
        title: "Submit assignment",
        dueDate: today,
        completed: false,
      },
      {
        title: "Prepare presentation slides",
        dueDate: tomorrowStr,
        completed: false,
      },
      {
        title: "Call the dentist",
        dueDate: yesterdayStr,
        completed: false,
      },
      {
        title: "Team meeting at 3 PM",
        dueDate: today,
        completed: false,
      },
    ];

    for (const todoData of sampleTodos) {
      await Todo.addTodo(todoData);
    }

    console.log("✅ Sample data added successfully!");
    console.log(`📊 Added ${sampleTodos.length} sample todos`);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  }
}

// Run if called directly
if (require.main === module) {
  seedData().then(() => {
    process.exit(0);
  });
}

module.exports = seedData;
