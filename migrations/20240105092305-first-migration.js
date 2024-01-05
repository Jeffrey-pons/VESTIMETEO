import { Db } from 'mongodb';

export async function up(db, client){

  // await db.collection('users').updateMany({}, { $set: { lastLoginDate: null } });
}

export async function down(db, client) {

  // await db.collection('users').updateMany({}, { $unset: { lastLoginDate: "" } });
}
