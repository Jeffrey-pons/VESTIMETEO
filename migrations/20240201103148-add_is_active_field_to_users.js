
  export async function up(db) {
    await db.collection('users').updateMany({}, {
      $set: { ExempleMigrationisActive: true }
    });
  }

  export async function down(db) {
    await db.collection('users').updateMany({}, {
      $unset: { ExempleMigrationisActive: ""}
    });
  }


  
