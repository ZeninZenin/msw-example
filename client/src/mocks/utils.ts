import { config } from "../config";

export const getAbsoluteUrl = (path: string) => `${config.API_URL}${path}`
