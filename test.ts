import {expectType} from 'tsd';
import {Content} from './readme';

const content: Content = null as any;
if (content.type === 'post') {
  expectType<'post'>(content.type);
  expectType<string>(content.text);
} else if (content.type === 'about') {
  expectType<string>(content.about);
} else if (content.type === 'contact') {
  expectType<string>(content.contact);
} else if (content.type === 'blog') {
  expectType<string>(content.title);
  expectType<string>(content.summary);
  expectType<string>(content.blog);
} else if (content.type === 'vote') {
  expectType<{value: number; expression: string; link: string}>(content.vote);
}
