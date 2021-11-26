

async function createTables(pg) {
  pg.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return pg.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.uuid('uuid');
        t.string('first_name', 100);
        t.string('last_name', 100);
        t.string('password');
      });
    }
  })
};

module.exports =  {
  createTables
};