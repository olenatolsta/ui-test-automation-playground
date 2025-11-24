import { z } from "zod";

const environmentSchema = z.object({
  BASE_URL: z.string(),
  login: z.string(),
  password: z.string(),
});

//Verifies environment mapping correctness
const environment = environmentSchema.parse(process.env);

export default environment;
