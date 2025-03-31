import * as crypto from 'crypto';
import 'dotenv/config'

export function createHashPassword(data: string): string {
  const customKey = process.env.KEY_HASH as string;
  
  const hmac = crypto.createHmac('sha256', customKey);
  hmac.update(data);
  return hmac.digest('hex');
}
