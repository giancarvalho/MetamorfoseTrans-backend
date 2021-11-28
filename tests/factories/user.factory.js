import faker from 'faker';

function createFakeUser() {
  const fakeUser = {
    name: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    type: faker.random.arrayElement(['trans', 'professional']),
  };

  return fakeUser;
}
function createEmailAndPassword(){
  const fakeUser = {
    password: faker.internet.password(),
    email: faker.internet.email(),
  };

  return fakeUser;
}

export { createFakeUser,createEmailAndPassword };
