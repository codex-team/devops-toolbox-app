import dotenv from 'dotenv';

dotenv.config();

export default class Config {
  public static url: string = process.env.VUE_APP_URL!;
}
