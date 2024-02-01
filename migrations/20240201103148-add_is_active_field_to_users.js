
  export async function up(db) {
    // Utilisez updateMany pour ajouter le champ isActive à tous les documents.
    await db.collection('users').updateMany({}, {
      $set: { ExempleMigrationisActive: true }
    });
  }

  export async function down(db) {
    // Utilisez updateMany pour supprimer le champ isActive de tous les documents.
    await db.collection('users').updateMany({}, {
      $unset: { ExempleMigrationisActive: ""}
    });
  }


  
