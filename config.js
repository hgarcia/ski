exports.CONFIG = {
  DBS: {
    main: {
      options: {
          database: 'skis',
          username: '',
          password: ''
      },
      uris: [
          '127.0.0.1:27017'
      ]
      // url: (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL)
    }
  }
};
