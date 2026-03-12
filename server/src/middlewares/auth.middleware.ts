import type { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request.exception.js";
import { JwtUtil } from "../utils/jwt.util.js";
import UserModel from "../database/models/user.model.js";
import { NotFoundException } from "../exceptions/not-found.exception.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new BadRequestException("Token não informado");
  }

  if (!authHeader.startsWith("Bearer ")) {
    throw new BadRequestException("Token inválido");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    throw new BadRequestException("Token inválido");
  }

  const userId = JwtUtil.verify(token);
  const user = await UserModel.findByPk(userId, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new NotFoundException("Usuário não encontrado");
  }

  req.user = user.dataValues;

  next();
}
