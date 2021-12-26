const serverConfig = {
  supabase: {
    anonKey: process.env.SUPABASE_ANON_KEY ?? '',
    projectURL: process.env.SUPABASE_PROJECT_URL ?? ''
  },
  dbURL: process.env.F_DB_URL
};

module.exports = serverConfig;
