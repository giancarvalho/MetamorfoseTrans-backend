import * as testRepository from '../repositories/test.repository.js';

async function clearDatabase() {
  await testRepository.clearSessions();
  await testRepository.clearUsers();
}

export { clearDatabase };
