import { QueryInterface } from "sequelize";
import { fakerPT_BR as faker } from "@faker-js/faker";

type TaskSeedRow = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  user_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

type SeedOptions = {
  count?: number;
  userId?: string | null;
};

function generateTasks({ count = 10, userId }: SeedOptions): TaskSeedRow[] {
  const tasks: TaskSeedRow[] = [];

  for (let i = 0; i < count; i++) {
    const createdAt = faker.date.between({
      from: new Date("2020-01-01"),
      to: new Date(),
    });

    const updatedAt = faker.date.between({
      from: createdAt,
      to: new Date(),
    });

    tasks.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(["pending", "in_progress", "completed"]),
      user_id: userId ?? faker.string.uuid(),
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: null,
    });
  }

  return tasks;
}

export default {
  async up(queryInterface: QueryInterface) {
    const [results] = await queryInterface.sequelize.query("SELECT id FROM users LIMIT 1");
    if (!results || results.length === 0) {
      throw new Error("No users found in the database");
    }

    const user = results[0] as { id: string };
    if (!user || !user.id) {
      throw new Error("User ID is missing");
    }

    const userId = user.id;

    const existsTasks = await queryInterface.rawSelect("tasks", {
      where: { user_id: userId },
    }, ["id"]);

    if (existsTasks && existsTasks.length > 0) {
      console.log("Tasks already exists");
      return;
    }

    const tasks = generateTasks({
      count: 20,
      userId,
    });

    await queryInterface.bulkInsert("tasks", tasks);
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("tasks", {});
  },
};
