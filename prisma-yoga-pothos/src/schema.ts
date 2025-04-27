import { builder } from "./builder";
import "./entities/customer";
import "./entities/employee";

export const schema = builder.toSchema();
