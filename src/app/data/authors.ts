export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export const authors: Record<string, Author> = {
  "herman": {
    name: 'Herman Stander',
    role: 'Core team developer and marketing',
    avatar: '4f5e6804-c9fb-4f38-4d2b-9f691f84f900' //imageID in cloudflare
  },
  "peter": {
    name: 'Peter Pistorius',
    role: 'Co-Founder, core team developer',
    avatar: '0ecedd8a-aec2-4783-ea00-a38aa1a18c00' //imageID in cloudflare
  },
  "justin": {
    name: 'Justin van der Merwe',
    role: 'Core team developer',
    avatar: '9c27adaa-3e4b-4b38-34ea-70268a02d100' //imageID in cloudflare
  },
  "amy": {
    name: 'Amy Dutton',
    role: 'Core team developer, marketing and design',
    avatar: 'f219a932-fb8a-4f09-5dff-0f262edd2200' //imageID in cloudflare
  }, 
}
