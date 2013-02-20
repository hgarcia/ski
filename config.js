exports.CONFIG = {
  DBS: {
    main: {
      url: (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL),
      host: '127.0.0.1',
      port: 27017,
      dbname: "tmtv",
      prefix: "",
      username: "",
      password: ""
    }
  }
};
