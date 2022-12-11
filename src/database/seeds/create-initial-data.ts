import { Connection, DataSource } from 'typeorm';
import { Seeder, SeederFactory, SeederFactoryManager } from 'typeorm-extension';
import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    FactoryManager: SeederFactoryManager,
  ): Promise<any> {
    const workspacesRepository = dataSource.getRepository(Workspaces);
    await workspacesRepository.insert([
      { id: 1, name: 'Sleact', url: 'sleact' },
    ]);
    const channelsRepository = dataSource.getRepository(Channels);
    await channelsRepository.insert([
      {
        id: 1,
        name: '일반',
        WorkspaceId: 1,
        private: false,
      },
    ]);
  }
}
