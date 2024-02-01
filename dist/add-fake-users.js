// add-fake-users.js
const mongoose = require('mongoose');
const User = require('./models/user'); // Assurez-vous d'importer correctement votre modèle utilisateur

mongoose.connect('mongodb://localhost:27017/VestiMeteo', { useNewUrlParser: true, useUnifiedTopology: true });

const fakeUser = {
  name: 'John',
  lastname: 'Doe',
  email: 'john@example.com',
  password: 'hashedpassword'
};

User.create(fakeUser)
  .then(() => {
    console.log('Fake user ajouté avec succès.');
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Erreur lors de lajout du faux utilisateur', error);
    mongoose.disconnect();
  });
