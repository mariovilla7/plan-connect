CREATE OR REPLACE FUNCTION public.decrement_ai_credits(p_firebase_uid text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid TEXT := get_firebase_uid();
BEGIN
  -- Verify the caller is the owner
  IF v_uid IS NULL OR v_uid != p_firebase_uid THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Decrement with floor check
  UPDATE profiles
  SET ai_credits = ai_credits - 1,
      updated_at = now()
  WHERE firebase_uid = p_firebase_uid
    AND ai_credits > 0;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;
END;
$$;