import { createClient } from '@supabase/supabase-js';

const TRIAL_DAYS = 30;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userId = req.query?.userId;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, trial_start_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const trialStartAt = new Date(user.trial_start_at);
    const now = new Date();

    const diffMs = now.getTime() - trialStartAt.getTime();
    const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const trialActive = daysPassed < TRIAL_DAYS;
    const daysLeft = Math.max(0, TRIAL_DAYS - daysPassed);

    return res.status(200).json({
      trialStartAt: user.trial_start_at,
      daysPassed,
      trialActive,
      daysLeft,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ?? 'Unknown error',
    });
  }
}
