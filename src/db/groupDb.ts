import { Group } from './entity/Group.entity';
import AppDataSource, { ensureInitialized } from './AppDataSource';
import type GroupInterface from '@/types/GroupInterface';

/**
 * Получение групп
 * @returns  Promise<GroupInterface[]>
 */
export const getGroupsDb = async (): Promise<GroupInterface[]> => {
  await ensureInitialized();
  const groupRepository = AppDataSource.getRepository(Group);
  return await groupRepository.find({
    relations: ['students'],
  });
};

/**
 * Добавление группы
 * @returns  Promise<GroupInterface>
 */
export const addGroupsDb = async (groupFields: Omit<GroupInterface, 'id'>): Promise<GroupInterface> => {
  await ensureInitialized();
  const groupRepository = AppDataSource.getRepository(Group);
  const group = new Group();
  const newGroup = await groupRepository.save({
    ...group,
    ...groupFields,
  });

  return newGroup;
};
