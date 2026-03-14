import { QueryInterface } from "sequelize";
import argon2 from "argon2";
import { fakerPT_BR as faker } from "@faker-js/faker";
import UserModel from "../models/user.model.js";

export default {
  async up(queryInterface: QueryInterface) {
    const password = await argon2.hash("essentia");
    const name = "Essentia";
    const email = "essential@email.com";

    const existingUser = await queryInterface.rawSelect(
      "users",
      {
        where: { email },
      },
      "id",
      UserModel,
    );

    if (existingUser) {
      console.log("User already exists");
      return;
    }

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
