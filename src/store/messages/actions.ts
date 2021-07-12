import type { ActionContext, ActionTree } from "vuex";
import type { RootState } from "../types";
import type { MessagesState } from "./types";
import { MutationTypes } from "./mutations";
import messageService from "~/services/messages";

export enum ActionTypes {
  getMessages = "getMesages",
  repost = "repost",
}

const actions = {
  async [ActionTypes.getMessages](
    { commit }: ActionContext<MessagesState, RootState>,
    search: string
  ) {
    const messages = await messageService.getMessages(search);
    commit(MutationTypes.SET_MESSAGES, messages ?? []);
  },
  async [ActionTypes.repost](
    { commit, state }: ActionContext<MessagesState, RootState>,
    reposts: { ownerId: number; id: number }[]
  ) {
    await messageService.repost(
      reposts.map((f) => ({
        owner_Id: f.ownerId,
        id: f.id,
      }))
    );
    commit(
      MutationTypes.SET_REPOSTED,
      state.messages.filter((f) =>
        reposts.some((a) => a.id === f.id && a.ownerId === f.ownerId)
      )
    );
  },
} as ActionTree<MessagesState, RootState>;

export default actions;
