import { getNetworkStatus } from '@/utils/suiClient';

export default async function handler(req, res) {
  try {
    const status = await getNetworkStatus();
    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
