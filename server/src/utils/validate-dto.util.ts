import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "../exceptions/bad-request.exception.js";

export async function validateDTO<T>(dtoClass: new () => T, body: unknown): Promise<T> {
  const dto = plainToInstance(dtoClass, body);

  const errors = await validate(dto as object);

  if (errors.length > 0) {
    console.log(errors);
    const messages = errors.map((err) => Object.values(err.constraints ?? {})).flat();

    throw new BadRequestException("Dados inválidos", new Error(messages.join(", ")));
  }

  return dto;
}
