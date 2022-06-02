import {
  Msg,
  PostContent,
  BlogContent,
  AboutContent,
  ContactContent,
  VoteContent,
  UnboxedMsg,
  MsgId,
  MsgInThread,
  AttendeeContent,
  GatheringContent,
} from './readme';

export function isMsg(msg: any): msg is Msg<any> {
  return msg && msg.key && msg.value && typeof msg.value === 'object';
}

export function isRootMsg(msg: Msg<any>): boolean {
  return !msg?.value?.content?.root;
}

export function isReplyMsgToRoot(rootKey: MsgId) {
  return (msg: MsgInThread) => msg?.value?.content?.root === rootKey;
}

export function isIndirectReplyMsgToRoot(rootKey: MsgId) {
  return (msg: MsgInThread) =>
    msg?.value?.content?.root === rootKey ||
    msg?.value?.content?.branch === rootKey ||
    msg?.value?.content?.fork === rootKey;
}

export function isPostMsg(msg: Msg<any>): msg is Msg<PostContent> {
  return msg?.value?.content?.type === 'post';
}

export function isRootPostMsg(msg: Msg<any>): msg is Msg<PostContent> {
  return isPostMsg(msg) && !msg.value.content.root;
}

export function isReplyPostMsg(msg: Msg<any>): msg is Msg<PostContent> {
  return isPostMsg(msg) && !!msg.value.content.root;
}

export function isAboutMsg(msg: Msg<any>): msg is Msg<AboutContent> {
  return msg?.value?.content?.type === 'about';
}

export function isContactMsg(msg: Msg<any>): msg is Msg<ContactContent> {
  return msg?.value?.content?.type === 'contact';
}

export function isVoteMsg(msg: Msg<any>): msg is Msg<VoteContent> {
  return msg?.value?.content?.type === 'vote';
}

export function isGatheringMsg(msg: Msg<any>): msg is Msg<GatheringContent> {
  return msg?.value?.content?.type === 'gathering';
}

export function isAttendeeMsg(msg: Msg<any>): msg is Msg<AttendeeContent> {
  return (
    msg?.value?.content?.type === 'about' &&
    msg.value.content.about &&
    msg.value.content.attendee &&
    msg.value.content.attendee.link
  );
}

export function isPrivate(msg: Msg<any> | UnboxedMsg): boolean {
  if ((msg as UnboxedMsg).meta?.private) return true;
  if ((msg as UnboxedMsg).value.private) return true;
  if (Array.isArray(msg.value.content?.recps)) return true;
  return typeof msg?.value?.content === 'string';
}

export function isPublic(msg: Msg<any> | UnboxedMsg): boolean {
  if ((msg as UnboxedMsg).meta?.private) return false;
  if ((msg as UnboxedMsg).value.private) return false;
  if (Array.isArray(msg.value.content?.recps)) return false;
  return typeof msg?.value?.content !== 'string';
}

export function isBlogMsg(msg: Msg<any>): msg is Msg<BlogContent> {
  return msg?.value?.content?.type === 'blog';
}
