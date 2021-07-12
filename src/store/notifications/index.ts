import { Module } from "vuex";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";
import type { NotificationState } from "~/store/notifications/types";
import type { RootState } from "~/store/types";

const state = () => ({} as NotificationState);

export default {
  namespaced: true,
  getters,
  actions,
  mutations,
  state,
} as Module<NotificationState, RootState>;
