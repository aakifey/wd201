const { Todo } = require("./models");

async function seedData() {
  try {
    // Clear existing data
    await Todo.destroy({ where: {} });

    // Add sample todos
    const sampleTodos = [
      {
        title: "Complete project documentation",
        dueDate: "2025-01-15",
        completed: false,
      },
      {
        title: "Review code changes",
        dueDate: "2025-01-10",
        completed: true,
      },
      {
        title: "Prepare presentation slides",
        dueDate: "2025-01-20",
        completed: false,
      },
      {
        title: "Update dependencies",
        dueDate: "2025-01-08",
        completed: true,
      },
      {
        title: "Write unit tests",
        dueDate: "2025-01-25",
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
