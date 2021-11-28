import faker from 'faker';

function createFakeUser() {
  const fakeUser = {
    name: faker.name.findName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
  };

  return fakeUser;
}

export { createFakeUser };
