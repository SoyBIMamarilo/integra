const { createClient } = require("@supabase/supabase-js");

ANON_KEY = process.env.ANON_KEY;

const options = {
  db: {
    schema: "presupuesto",
  },
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

const client = async (authToken) => {
  const client = createClient(
    "https://kfkiyhtoznvoealcynsj.supabase.co",
    ANON_KEY,
    options
  );
  const result = await client.auth.setSession({ access_token: authToken, refresh_token: "0" });
  console.log(result)
  return client
};

module.exports = client;
