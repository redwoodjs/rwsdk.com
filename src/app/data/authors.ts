export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export const authors: Record<string, Author> = {
  "herman": {
    name: 'Herman Stander',
    role: 'Core team developer and marketing',
    avatar: 'e279b807-974e-4d7b-100b-99fd97cedf00' //imageID in cloudflare
  },
  "peter": {
    name: 'Peter Pistorius',
    role: 'Co-Founder, core team developer',
    avatar: '0ecedd8a-aec2-4783-ea00-a38aa1a18c00' //imageID in cloudflare
  },
  "justin": {
    name: 'Justin van der Merwe',
    role: 'Core team developer',
    avatar: 'e279b807-974e-4d7b-100b-99fd97cedf00' //imageID in cloudflare
  },
  "amy": {
    name: 'Amy Dutton',
    role: 'Core team developer, marketing and design',
    avatar: 'e279b807-974e-4d7b-100b-99fd97cedf00' //imageID in cloudflare
  }, 
}
