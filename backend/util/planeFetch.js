const client = require("./supabase-client");

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
