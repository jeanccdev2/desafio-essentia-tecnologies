import { QueryInterface } from "sequelize";
import argon2 from "argon2";
import { fakerPT_BR as faker } from "@faker-js/faker";

export default {
  async up(queryInterface: QueryInterface) {
    const password = await argon2.hash("senha123");
    const name = faker.person.fullName();
    const firstName = name.split(" ")[0]!;
    const email = faker.internet.email({ firstName: firstName.toLowerCase() });

    return queryInterface.bulkInsert(
      "users",
      [
        {
          id: faker.string.uuid(),
          name,
          email,
          password,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete("users", {});
  },
};
