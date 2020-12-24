import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/../../.env') });

/**
 * App settings (data from .env)
 */
export default class Config {
  /**
   * API url
   */
  public static apiUrl: string = process.env.VUE_APP_API_URL!;

  /**
   * Authorization token
   */
  public static token: string = process.env.VUE_APP_TOKEN!;
}
