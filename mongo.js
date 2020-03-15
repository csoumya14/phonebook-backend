const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const nameC = process.argv[3];
const numberC = process.argv[4];

const url = `mongodb+srv://phonebook:${password}@cluster0-s9l4w.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 5) {
  Person.find({}).then(response => {
    console.log('PhoneBook: ');
    response.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: nameC,
    number: numberC,
  });

  person.save().then(result => {
    console.log(`added ${nameC} number ${numberC} to phonebook `);
    mongoose.connection.close();
  });
}
