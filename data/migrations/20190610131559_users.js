exports.up = function(knex) {
      return knex.schema.createTable('users', users => {
        users.increments();
    
        users
          .string('username', 40)
          .notNullable()
          .unique();
        users.string('password', 40).notNullable();
      });
    };
    
    exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('users');
    };
