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

exports.planeFetch = (tableName) => {
  return exports.getExpressCall(async (supabase) => {
    return supabase.from(tableName).select().limit(100);
  });
};

exports.fetchFilter = (tableName, columnName, paramName) => {
  return exports.getExpressCall(async (supabase, params) => {
    return supabase.from(tableName).select().eq(columnName, params[paramName]);
  });
};

exports.getExpressCall = (clientHandleFunction) => {
  return async (req, res, next) => {
    let body = req.body;
    let params = req.params;
    let finalData;
    const { access_token } = req.headers;
    try {
      const supabase = await client(access_token);

      const { data, error } = await clientHandleFunction(
        supabase,
        params,
        body
      );
      console.log(error);

      finalData = data;
    } catch (err) {
      console.log(err);
    }
    console.log(finalData);
    res.json(finalData);
    
    return next();
  };
};
