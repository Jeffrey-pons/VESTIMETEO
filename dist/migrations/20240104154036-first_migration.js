export async function up(db) {
    // Exemple : Créer une nouvelle collection
    await db.collection('users').updateMany({}, { $set: { lastLoginDate: null } });
}
export async function down(db) {
    // Exemple : Supprimer la nouvelle collection créée dans la fonction up
    await db.collection('users').updateMany({}, { $unset: { lastLoginDate: "" } });
}
