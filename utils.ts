import {
  Msg,
  PostContent,
  AboutContent,
  ContactContent,
  VoteContent,
} from './readme';

export function isMsg(msg: any): msg is Msg<any> {
  return msg && msg.key && msg.value && typeof msg.value === 'object';
}

export function hasContent(msg: Msg): boolean {
  return !!(msg && msg.value && msg.value.content);
}

export function isPostMsg(msg: Msg<any>): msg is Msg<PostContent> {
  return hasContent(msg) && msg.value.content.type === 'post';
}

export function isAboutMsg(msg: Msg<any>): msg is Msg<AboutContent> {
  return hasContent(msg) && msg.value.content.type === 'about';
}

export function isContactMsg(msg: Msg<any>): msg is Msg<ContactContent> {
  return hasContent(msg) && msg.value.content.type === 'contact';
}

export function isVoteMsg(msg: Msg<any>): msg is Msg<VoteContent> {
  return hasContent(msg) && msg.value.content.type === 'vote';
}

export function isPrivate(msg: Msg<any>): boolean {
  return hasContent(msg) && typeof msg.value.content === 'string';
}

export function isPublic(msg: Msg<any>): boolean {
  return hasContent(msg) && typeof msg.value.content === 'object';
}
