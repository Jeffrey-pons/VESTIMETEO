import { Db} from 'mongodb';

export async function up(db: Db): Promise<void> {

  // Exemple : Créer une nouvelle collection
  await db.collection('users').updateMany({}, { $set: { lastLoginDate: null } });

 
}

export async function down(db: Db): Promise<void> {

  // Exemple : Supprimer la nouvelle collection créée dans la fonction up
  await db.collection('users').updateMany({}, { $unset: { lastLoginDate: "" } });
}

