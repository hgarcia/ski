exports.CONFIG = {
  DBS: {
    main: {
      options: {
          database: 'skis',
          username: '',
          password: '',
          w: 1
      },
      uris: [
          '127.0.0.1:27017'
      ],
      url: process.env.MONGOHQ_URL
    }
  }
};
