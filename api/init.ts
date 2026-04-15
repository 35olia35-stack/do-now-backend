import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body ?? {};

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('id, trial_start_at')
      .eq('id', userId)
      .maybeSingle();

    if (selectError) {
      return res.status(500).json({ error: selectError.message });
    }

    if (!existingUser) {
      const now = new Date().toISOString();

      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          trial_start_at: now,
        });

      if (insertError) {
        return res.status(500).json({ error: insertError.message });
      }

      return res.status(200).json({
        ok: true,
        userId,
        trialStartedAt: now,
      });
    }

    return res.status(200).json({
      ok: true,
      userId,
      trialStartedAt: existingUser.trial_start_at,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ?? 'Unknown error',
    });
  }
}
