// Reference/demo copy. Edit these entries to personalize the journey.
export type StoryPart = { text: string; href?: string };
export type Milestone = { year: number; title: string; description: string; handle: string; time: string; images: {src: string; alt: string}[]; detailImages: {src: string; alt: string}[]; detailTitle: string[]; story: StoryPart[]; anchor: {x: number; y: number; side: "left" | "right"} };

export const aboutContent = {
  label: "Start small grow big",
  heading: ["About Me (&)", "My Journey"],
  introduction: "Seven years ago I opened Webflow for the first time. What happened after that is easier to show than explain.",
  email: "nenad@popadic.co",
};

export const milestones: Milestone[] = [
  {
    "year": 2019,
    "title": "Starting out with my brother",
    "description": "My brother Stefan showed me Webflow. I bothered him with questions for three months straight. He probably regrets it.",
    "handle": "@stefan",
    "time": "7years ago",
    "images": [
      {
        "src": "/images/about/6938003f0416538c089a67eb.avif",
        "alt": "My brother Stefan"
      },
      {
        "src": "/images/about/6938003e6bd18390b3bef67c.avif",
        "alt": ""
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df05a90861c514ccbed5.svg",
        "alt": ""
      },
      {
        "src": "/images/about/6945df25b4ed7feceb529a70.avif",
        "alt": "My Brother Stefan"
      }
    ],
    "detailTitle": [
      "Starting out with my brother"
    ],
    "story": [
      {
        "text": "My brother Stefan, a UX designer, opened Webflow and created something right in front of me. I had no idea what I was doing but I couldn't close the laptop. No master plan, no career goal. Just a guy who found something and couldn't let go. Three months of late nights and annoying my brother with questions later, I knew this was it."
      }
    ],
    "anchor": {
      "x": 1111.09,
      "y": 6.5,
      "side": "right"
    }
  },
  {
    "year": 2020,
    "title": "First freelance steps",
    "description": "First real client. First real panic. Working for yourself and working for someone else are completely different.",
    "handle": "@webflow",
    "time": "6years ago",
    "images": [
      {
        "src": "/images/about/6938003e6bd18390b3bef67c.avif",
        "alt": ""
      },
      {
        "src": "/images/about/69399f930d96c6e20e538418.avif",
        "alt": ""
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df05a90861c514ccbed5.svg",
        "alt": ""
      },
      {
        "src": "/images/about/6945df05926be20e2a5210dc.svg",
        "alt": ""
      }
    ],
    "detailTitle": [
      "First freelance steps"
    ],
    "story": [
      {
        "text": "Practicing on my own was comfortable. Then someone trusted me with their project and suddenly every pixel mattered in a way it didn't before. That first year of client work taught me more than six months of practice ever did. Not because the projects were complex but because someone was counting on me to get it right."
      }
    ],
    "anchor": {
      "x": 186.086,
      "y": 341.5,
      "side": "left"
    }
  },
  {
    "year": 2021,
    "title": "Beyond what I knew",
    "description": "A biotech project that made me think this isn't possible in Webflow. Turns out it was.",
    "handle": "@fiftyseven",
    "time": "5years ago",
    "images": [
      {
        "src": "/images/about/69399f936be7964da2364ec5.avif",
        "alt": "FiftySeven Agency"
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df057bcc609a31ad9653.avif",
        "alt": "FiftySeven Agency"
      }
    ],
    "detailTitle": [
      "Beyond what ",
      "I knew"
    ],
    "story": [
      {
        "text": "When "
      },
      {
        "text": "FIFTYSEVEN",
        "href": "https://www.fiftyseven.co/"
      },
      {
        "text": " sent me the brief for Roswell Biotech, my first thought was honestly this can't be done in Webflow. The design demanded pixel-perfect execution, the functionality was complex, and I had to teach myself JavaScript mid-project to make it work. Scariest project I ever took on. Also the one that changed how I approach everything after it."
      }
    ],
    "anchor": {
      "x": 105.086,
      "y": 739.5,
      "side": "left"
    }
  },
  {
    "year": 2022,
    "title": "Leveling up",
    "description": "The year animations and CMS stopped being extras and started shaping how every project feels.",
    "handle": "@gsap",
    "time": "4years ago",
    "images": [
      {
        "src": "/images/about/69399f93c84f50980dd014b3.avif",
        "alt": ""
      },
      {
        "src": "/images/about/69399f9327bbf72053c6447f.avif",
        "alt": ""
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df0596a543d59e90401b.svg",
        "alt": ""
      },
      {
        "src": "/images/about/6945df0508fec342703e430f.svg",
        "alt": ""
      }
    ],
    "detailTitle": [
      "Leveling up"
    ],
    "story": [
      {
        "text": "GSAP went from something I used occasionally to something that shaped every project. Animations weren't decoration anymore, they were part of how a site communicates. On the CMS side I kept finding cleaner and smarter ways to structure content, setups that made managing a site effortless for clients. Everything I worked on this year started feeling more intentional."
      }
    ],
    "anchor": {
      "x": 998.086,
      "y": 1092.5,
      "side": "right"
    }
  },
  {
    "year": 2023,
    "title": "From trust to referrals",
    "description": "No pitch. No portfolio review. Just clients telling people 'work with Nenad.' That hit different.",
    "handle": "@clients",
    "time": "3years ago",
    "images": [
      {
        "src": "/images/about/69399f9348881bb03b006451.avif",
        "alt": ""
      },
      {
        "src": "/images/about/69399f933cc29e0ef38aa1b4.avif",
        "alt": ""
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df05fc58dfb3e9f5fbec.svg",
        "alt": ""
      },
      {
        "src": "/images/about/6945df06fafef34d89b8c2f0.svg",
        "alt": ""
      }
    ],
    "detailTitle": [
      "From trust to referrals"
    ],
    "story": [
      {
        "text": "Clients I'd worked with came back with new projects. Some recommended me to people I'd never met. No interview, no portfolio walkthrough, just 'work with Nenad, he delivers.' That kind of trust isn't something you can put in a case study. But it's the thing I'm most proud of."
      }
    ],
    "anchor": {
      "x": 582.086,
      "y": 1482.5,
      "side": "left"
    }
  },
  {
    "year": 2024,
    "title": "A life-changing year",
    "description": "I got married. My daughter Djina was born. Suddenly everything I do has a deeper reason behind it.",
    "handle": "@family",
    "time": "2years ago",
    "images": [
      {
        "src": "/images/about/69399f936be7964da2364eca.avif",
        "alt": ""
      },
      {
        "src": "/images/about/69399f939dc793550f75d931.avif",
        "alt": "Daughter Djina"
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/6945df057a20901ce46dcb36.svg",
        "alt": ""
      },
      {
        "src": "/images/about/694678ece28003b18bbca37b.avif",
        "alt": "Smiling baby girl with blue eyes wearing a pink bow headband and a white outfit."
      }
    ],
    "detailTitle": [
      "A life - ",
      "changing year"
    ],
    "story": [
      {
        "text": "Before this year I thought I understood what motivation meant. I had no idea. Nothing makes you sharper at work than knowing exactly who you're coming home to. Djina changed how I see everything, not just life, but how I show up for every single thing I do."
      }
    ],
    "anchor": {
      "x": 59.0859,
      "y": 1766.5,
      "side": "left"
    }
  },
  {
    "year": 2026,
    "title": "The journey continues",
    "description": "Seven years in. Still obsessed. Now figuring out how AI fits into what I do.",
    "handle": "@nenad",
    "time": "2hours ago",
    "images": [
      {
        "src": "/images/about/69399f93fddfcaeaadcfa3d1.avif",
        "alt": ""
      }
    ],
    "detailImages": [
      {
        "src": "/images/about/693fbb7c6a81b0964539f3bc.avif",
        "alt": "Me | Nenad Popadic"
      }
    ],
    "detailTitle": [
      "The journey continues"
    ],
    "story": [
      {
        "text": "The industry doesn't stand still and neither do I. After seven years of working, learning, and evolving, AI has opened up a whole new layer of what's possible. Same obsession, new tools. The best work is still ahead."
      }
    ],
    "anchor": {
      "x": 458.086,
      "y": 2129.5,
      "side": "left"
    }
  }
];
