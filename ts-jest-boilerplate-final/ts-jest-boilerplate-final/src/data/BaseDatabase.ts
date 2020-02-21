import knex from 'knex'

export abstract class BaseDatabase {
  protected connection = knex({
    client: "mysql",
    connection: {
      host: 'ec2-18-229-236-15.sa-east-1.compute.amazonaws.com',
      user: 'brunna',
      password: 'f0938b7263c683db91a52018a6b038e8',
      database: 'brunna' ,
      debug: true  
  }
  });

  getSQLDateFromTSDate = (date: Date): string => date.toISOString().split('T')[0]
}