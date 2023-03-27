import { defineStore } from 'pinia';
import groupsService from 'src/api/groups';
import { GroupState } from 'stores/types';

export const useGroupsStore = defineStore('groups', {
  state: (): GroupState => ({
    groups: [],
  }),

  actions: {
    async getGroups(page: number, count: number) {
      this.groups = await groupsService.get(page, count);
    },
  },
});
