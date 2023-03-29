import { DialogPayload, EVENTS } from '../types'

export const introContent = {
  title: 'Dumb Ways to Die In Product Development',
  title_multiline: ['Dumb Ways to Die In', 'Product Development'],
  subtitle: 'DEPT® Arcade Presents',
  dismiss: '~~ Start Game ~~',
}

export const instructionContent = {
  title: 'Controls:',
  body: `
    <p>Playing is easy!</p>
    <p>If you have a keyboard, you can move around the office with your <span className="highlight">ARROW</span> keys. You can use your <span className="highlight">ARROW</span> keys or the <span className="highlight">TAB</span> key to choose your response to prompts. To submit the your response, hit <span className="highlight">ENTER</span> or simply <span className="highlight">CLICK</span> the response of your choice.</p>
    <p>If you're on a touch-capable device, you can move around with the <span className="highlight">JOYSTICK</span> in the bottom corner. When prompted, simply <span className="highlight">TAP</span> the response of your choice.</p>
    <p>Good luck!</p>
  `,
  dismiss: 'Got it!',
}

export const outroContent = {
  title: (count: number | string) =>
    `You made it and you only <class="tag0">died ${count} times</class>`,
  restart: 'Play again',
  end: 'Tell me how I could do better (?)',
}

export const onboardingContent = {
  title: 'Welcome back to the office!',
  body: `
    <p>Hey! Glad to see you decided not to work from home today. We have a few really important product updates going out soon and we need your help. You should connect with the folks around the office.</p>
    <p>
      You can move around with your <span className="highlight">ARROW</span> keys. Or, if you're on a
      touch device, you can use the <span className="highlight">JOYSTICK</span> in the bottom corner. You can also <span className="highlight">TAP the "?" ICON</span> in the top corner in case you forget.
    </p>
    <p>If you can make it out of the office today without dying today, we can probably get those releases out.</p>
  `,
  dismiss: 'Got it!',
}

export const offboardingContent = {
  title: 'Leaving so soon?',
  body: `
    <p>Did you have a chance to speak with everyone who's been looking for you? If not, you should connect with them before you leave for the day.</p>
  `,
  dismiss: 'I can stay a little longer!',
  confirm: 'I should really be going...',
}

export const dialogMapping: Record<string, DialogPayload> = {
  'npc-1': {
    id: 'npc-1',
    name: 'Chief Product Officer',
    prompt: `
      <p>Ah, I see you have embarked on the adventure that is Product Development. I am the Product Wizard, a mystical being with the power to bless you with many fine releases... or curse you with a long future of dumpster fires! Many challenges await you today, if you survive you will earn my blessing. But, first, answer me this riddle!</p> 
      <p><em>"I’m sent before I’m ready, I’ll break before you know it and you can’t find me many places. What am I?"</em></p>
      `,
    choices: [
      {
        response: "A jackal! It looks like a Jackal! Jackal? Jackal! It's a jackal! Right?",
        result: EVENTS.DIE,
        followup: {
          title: 'Trick question!',
          body: `
            <p>Hehe, trick question! This might be a feeling you experience often today. Remember you can always try again!</p>
            <p>The answer is <em>your app’s Beta Release</em>.</p>
            <p>Now, here is my wisdom: There’s nothing more permanent than something that’s temporary.</p>
            <p>Welcome to <span className="highlight">Dumb Ways to Die in Product Development</span>! I grant you the power of infinite patience in the adventure ahead. You’ll need it! </p>
          `,
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Your mobile app',
        result: EVENTS.DIE,
        followup: {
          title: 'Trick question!',
          body: `
            <p>Hehe, trick question! This might be a feeling you experience often today. Remember you can always try again!</p>
            <p>The answer is <em>your app’s Beta Release</em>.</p>
            <p>Now, here is my wisdom: There’s nothing more permanent than something that’s temporary.</p>
            <p>Welcome to <span className="highlight">Dumb Ways to Die in Product Development</span>! I grant you the power of infinite patience in the adventure ahead. You’ll need it! </p>
          `,
          dismiss: 'Keep going',
        },
      },
      {
        response: 'The project manager',
        result: EVENTS.DIE,
        followup: {
          title: 'Trick question!',
          body: `
            <p>Hehe, trick question! This might be a feeling you experience often today. Remember you can always try again!</p>
            <p>The answer is <em>your app’s Beta Release</em>.</p>
            <p>Now, here is my wisdom: There’s nothing more permanent than something that’s temporary.</p>
            <p>Welcome to <span className="highlight">Dumb Ways to Die in Product Development</span>! I grant you the power of infinite patience in the adventure ahead. You’ll need it! </p>
          `,
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-2': {
    id: 'npc-2',
    name: 'Product Support Rep',
    prompt: `
      <p>Hey, you’re the project manager right? Our customers need support, so we should build out an in-app messaging feature for next month’s release.</p>
    `,
    choices: [
      {
        response: 'That won’t be hard at all! On it.',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>Did you consider proposing a SaaS solution to meet the need? We’ve found that proposing “good enough” alternatives, especially when they’re available via SaaS offerings sometimes meets this need.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: '<em>Laugh uncontrollably. Pause. Laugh harder, fall on the floor.</em>',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>Did you consider proposing a SaaS solution to meet the need? We’ve found that proposing “good enough” alternatives, especially when they’re available via SaaS offerings sometimes meets this need.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'You know text messages are a thing, right?',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good call!',
          body: '<p>Turns out the messaging feature wasn’t very important after all.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'Oh, well, what other features can be postponed to make room in the timeline to do that?',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>Did you consider proposing a SaaS solution to meet the need? We’ve found that proposing “good enough” alternatives, especially when they’re available via SaaS offerings sometimes meets this need.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-3': {
    id: 'npc-3',
    name: 'Disgruntled Engineer',
    prompt: `
      <p>Hey, remember the company chili cookoff? What a sham that was! My chili was definitely the best, right?</p>
      `,
    choices: [
      {
        response:
          'A total sham! You really deserved to win that one... We should do a recount of the votes.',
        result: EVENTS.DIE,
        followup: {
          title: 'Crying over spilled chili?',
          body: '<p>Recounting votes on a company chili cookoff? There’s more important work to be done right now. Not to mention a recount would be terrible for team morale.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'All the entries were great, but yours was definitely the best.',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: "<p>You're right. Theirs was the best. But that isn't enough to get them the trophy, is it?</p>",
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-4': {
    id: 'npc-4',
    name: 'Technical Lead',
    prompt: `
      <p>Whew, I’m so glad to see you! I’m the tech lead over in the AI group. I’m not sure we’re going to make the release this week, there’s a backlog of fifteen pull requests waiting to be merged and I can’t get the developers to stop asking ChatGPT to code their next features.</p>
      `,
    choices: [
      {
        response: '<em>Spit out your coffee and run away crying.</em>',
        result: EVENTS.DIE,
        followup: {
          title: 'You have died.',
          body: '<p>The engineering team is upset at you and the tech lead has quit in revolt. Looks like the rest of the team might follow suit. You’re right to be upset at the engineering team, but now’s not the time for blaming or asking Chatbots to do our work for us!</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Can ChatGPT check the code for us?',
        result: EVENTS.DIE,
        followup: {
          title: 'You have died.',
          body: '<p>The engineering team is upset at you and the tech lead has quit in revolt. Looks like the rest of the team might follow suit. You’re right to be upset at the engineering team, but now’s not the time for blaming or asking Chatbots to do our work for us!</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'What the heck are you all doing over there? This is ridiculous, get on them and just get the release out!',
        result: EVENTS.DIE,
        followup: {
          title: 'You have died.',
          body: '<p>The engineering team is upset at you and the tech lead has quit in revolt. Looks like the rest of the team might follow suit. You’re right to be upset at the engineering team, but now’s not the time for blaming or asking Chatbots to do our work for us!</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'Oh my, let’s shut off their access to ChatGPT, pause work on new features, and get that backlog unjammed.',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good idea!',
          body: '<p>We’ve found the best way to clear this kind of blockage is to focus on minimizing work in progress and getting completed work out the door ready to ship. Of course, this could have all been avoided with the right agile processes up front.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-5': {
    id: 'npc-5',
    name: 'Sales Representative',
    prompt: `
      <p>You’re the product owner of the sales app right? I was just curious why you implemented that automated contract signing feature for customers?</p>
      <p classname="reply">Oh, yeah, do you like it? That took us about six months to develop. Lots of advanced technology in there and tons of work to get integrated Document signing in the app.</p>
      <p>You know we get paid on commission right? So manually signing contracts is how we get paid. The whole sales team is ready to storm your office.<p>
      `,
    choices: [
      {
        response:
          'Oh, that explains why there have only been two uses of the feature since it went out.',
        result: EVENTS.DIE,
        followup: {
          title: 'You died!',
          body: '<p>You’re not wrong about why this feature failed but you’ve still just wasted $2 million dollars in development resources to build something that nobody will use because they see it as a threat. You really should have gotten buy-in from all your stakeholders or tested your idea.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'The COO told me it would bring in millions!',
        result: EVENTS.DIE,
        followup: {
          title: 'You died!',
          body: '<p>Excuses, excuses, you’ve died! Nobody’s using this feature and it’s already cost $2 million dollars in development resources. Hopefully you’ll do some thinking and figure out where you went wrong.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'What, are they afraid of a little competition?',
        result: EVENTS.DIE,
        followup: {
          title: 'You died!',
          body: '<p>Excuses, excuses, you’ve died! Nobody’s using this feature and it’s already cost $2 million dollars in development resources. Hopefully you’ll do some thinking and figure out where you went wrong.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'I’ve literally never met anyone from sales! At least until now... Can we grab a drink later?',
        result: EVENTS.LIVE,
        followup: {
          title: 'You died!',
          body: '<p>What a pickle! But you’ve made a smart choice by opening the door to more conversation. Perhaps there’s a way for you and Sales to speak with the COO at a later date and figure out a way to course-correct.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-6': {
    id: 'npc-6',
    name: 'Intern',
    prompt: `
      <p>HELP! I got a notification that my computer's version of FLASH is out of date. I downloaded the update and now I keep getting all sorts of spam popups. What should I do?</p>
      `,
    choices: [
      {
        response: 'Have you tried downloading Internet Explorer 6 to see if that fixes the issue?',
        result: EVENTS.DIE,
        followup: {
          title: 'Joke’s on you, you’ve died!',
          body: '<p>They’re not even old enough to understand that joke.',
          dismiss: 'Keep going</p>',
        },
      },
      {
        response: 'What other dumb things have you done today?',
        result: EVENTS.DIE,
        followup: {
          title: 'That’s not nice, you’ve died!',
          body: '<p>Good talent is hard to come by and there’s no better way to foster it than by guiding less-experienced people in the right direction.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'You should reach out to the IT department ASAP',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good call!',
          body: '<p>IT security is crucial to every organization and exploits should be dealt with immediately to prevent the damage from spreading.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-7': {
    id: 'npc-7',
    name: 'Junior Front-End Developer',
    prompt: `
      <p>Hey, uh, so I had to set up a Postgres database for my project. It has millions of records across dozens of relational tables and all of my queries are taking forever to complete.</p>
      <p>I tried adding indexes to all of the columns, but nothing seems to help... What should I do?</p>
      `,
    choices: [
      {
        response: 'Indexes are always the answer. Just add more until the queries run faster.',
        result: EVENTS.DIE,
        followup: {
          title: 'You died!',
          body: '<p>It’s not always that simple. Adding more indexes to the database burned a bunch of project hours and the performance issues still persist. Today will be your last day at the company.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'It might be worth switching to MongoDB...',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>Sounds like MongoDB wouldn’t be a sufficient solution for the type of problem.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'Let’s evaluate some of these operations and identify some opportunities for more performant SQL queries.',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good choice!',
          body: `
            <p>Database query plans are complex and sometimes there’s simply no bandaid fix. Best to get to the root of the problem so the issues don’t become even bigger.</p>
            <p>Spending some time thinking about your data model up front and deciding what type of database best fits it pays off in huge ways."</p>
            `,
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-8': {
    id: 'npc-8',
    name: 'Clueless User',
    prompt: `
      <p>Hey, you’re a developer, right? I just submitted a bug ticket: The sound on the app isn’t playing when the device is muted. Can you fix that ASAP? We have customers asking about it.</p>
      `,
    choices: [
      {
        response: 'Sure, I’ll get to that after I convince Tim Cook to unmute all the iPhones.',
        result: EVENTS.LIVE,
        followup: {
          title: 'Come on, really?!',
          body: '<p>You died! Ridiculous as this bug ticket is, you’ve got to play nice!</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: '<em>A blank, dumbfounded stare</em>',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>You died! Ridiculous as this bug ticket is, you’ve got to play nice!</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Bless your heart. Do you need a hug?',
        result: EVENTS.LIVE,
        followup: {
          title: 'This company needs more people like you!',
          body: '<p>This customer support person is <em>really</em> stressed out. They needed that hug.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-9': {
    id: 'npc-9',
    name: 'Blockchain Engineer',
    prompt: `
      <p>Hey, looks like you're heading out... before you go, I have a random question for you... My favorite snack company came out with NFTs for their chip flavors. Which one should I spend my last two Bitcoins on?</p>
      `,
    choices: [
      {
        response: 'Cool Ranch',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good answer!',
          body: '<p>Cool Ranch is the superior flavor.',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Nacho Cheese',
        result: EVENTS.DIE,
        followup: {
          title: 'Eh... okay...',
          body: '<p>That one will have to do... looks like the last edition of the Cool Ranch NFT is sold out.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-10': {
    id: 'npc-10',
    name: 'The Slack Notification Heard Round The World',
    prompt: `
      <p><img src="/images/slack-1.png"></p>
      <p><img src="/images/slack-2.png"></p>
      `,
    choices: [
      {
        response: '<em>Mark all as read. Get some popcorn. This’ll be a show!</em>',
        result: EVENTS.LIVE,
        followup: {
          title: 'Good Enough!',
          body: '<p>There’s no winning here, but this is the closest to a win you’ll gonna get. You should probably brush up your resume, though.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'You can’t even login without a credit card right now!',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>There’s no winning here, you’ve died.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          'You know the app is running on Francisco’s laptop right? And when he loses WiFi at Starbucks it goes down.',
        result: EVENTS.DIE,
        followup: {
          title: 'Oh no, you died!',
          body: '<p>There’s no winning here, you’ve died.</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
  'npc-11': {
    id: 'npc-11',
    name: 'Architecture Dumpster Fire',
    prompt: `
      <p>How flexible is your app’s architecture?</p>
      <p classname="reply">Oh, it’s a state of the art, event-based technology platform backed by Kafka, comprised of microservices, a Data Lake, and a InfluxDB timeseries database. It’s fast, performant and flexible.</p>
      <p>I’m glad it’s flexible, because we’re pivoting. Our new pitch is “Uber for dogs.” Guaranteed success. So it’ll only take a few days to change the app over?</p>
      `,
    choices: [
      {
        response:
          'Actually it’ll take months to get the platform to do something Uber-like because the whole thing is built on timeseries data for TODO lists and not location based data for dogs.',
        result: EVENTS.DIE,
        followup: {
          title: 'On no, you died!',
          body: '<p>You overbuilt a whole architecture without testing your ideas and understanding your budget, despite this being an absolutely awful idea.',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Uber for dogs is a horrible idea.',
        result: EVENTS.DIE,
        followup: {
          title: 'On no, you died!',
          body: '<p>It <em>is</em> a horrible idea but... You’ve died. You overbuilt a whole architecture without testing your ideas and understanding your budget.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response: 'Gee, I sure hope we’ve got someone already working on ’iPhone for dogs.’',
        result: EVENTS.DIE,
        followup: {
          title: 'On no, you died!',
          body: '<p>You died! Your sarcasm isn’t appreciated, plus you’ve overbuilt a whole architecture without testing your ideas and understanding your budget.</p>',
          dismiss: 'Keep going',
        },
      },
      {
        response:
          '<em>Nervously laugh.</em> That’s an interesting idea. I’ll need to do some digging before I’ll have a timeframe... you know, because dogs like digging right?',
        result: EVENTS.DIE,
        followup: {
          title: 'On no, you died!',
          body: '<p>Whew, looks like you’ve escaped... for now. Your architecture is overbuilt, however, and there’s no way you can get any idea for a project (no matter how terrible!) off the ground that fast. You’ve got to start thinking simpler about architectures. In the meantime, better hope there’s a cat person in the office to shoot this idea down...</p>',
          dismiss: 'Keep going',
        },
      },
    ],
  },
}

export const lessonsContent = {
  intro: {
    title: 'Lessons Learned',
    body: `
      <p>So you embarked on the journey of product development in little game. Good for you! How’d you do? Did you stay alive long? Probably not. If you haven’t <a href="/">played our game</a>, you really should.</p>
      <p>So how could you have avoided some of your firings?</p>
      <p>Let’s briefly go character by character:</p>
    `,
  },
  lessons: [
    {
      title: 'The Chief Product Officer Riddle',
      body: `
        <p><em>“I’m sent before I’m ready, I’ll break before. You know it and you can’t find me many places.  What am I? ... Your beta release.”</em></p>
        <p>We’ve found that there’s nothing more permanent than something that’s temporary. There’s a fine line between being “Good enough to ship” and “piece of junk ready to break at any moment.”  There’s ways to avoid this by building a solid foundation with things like a cohesive design system, continuous integration, careful deployment, and thorough testing. </p>
      `,
    },
    {
      title: 'The Product Support Rep Asking for a Chat Feature',
      body: `
        <p><em>“We need to build out a custom in-app messaging feature for our customers to chat with support for next month’s release.”</em></p>
        <p>These types of requests often come from people in support organizations that grow quickly. When you were building your product, things that operationalize your business but by the wayside to get the product to market. Now you’ve got to pay the piper.</p>
        <p>It’s tempting to keep pushing things like this down the road, but you really can’t.</p>
        <p>When we hear requests for things like this, we almost always reach for a third party solution, or even offload this type of functionality to another service outside of the core product.  Your business should focus on what differentiates it, not tangential things like chat, support etc.  There are a lot of options for things like chat, notifications, etc that may be “good enough” for your product. </p>
        <p>We regularly run <a href="https://www.deptagency.com/service/engineering/technology-strategy-architecture/">Architecture Sprints</a> to help identify areas where a SaaS offering will be perfect for these types of use cases with minimal need for custom product development.</p>
      `,
    },
    {
      title: 'The Disgruntled Engineer and the Chili Cookoff',
      body: `
        <p><em>“Hey, remember the company chili cookoff? What a sham that was! My chili was definitely the best, right?”</em></p>
        <p>Well, that’s just silly! 😉 You’ve got to have your Chili cookoff rules on lock to avoid angry colleagues!</p>
      `,
    },
    {
      title: 'The Technical Lead with the Pull Request Backup',
      body: `
        <p><em>“I’m not sure we’re gonna make the release this week, there’s a backlog of fifteen pull requests waiting to be merged...”</em></p>
        <p>Engineering teams in nascent companies can grow quickly in size but that doesn’t mean have the right prioritization or processes in place to manage that growth. If you hear things like this, chances are your tech lead is doing their best to keep up, but they’re probably too busy fighting fires to keep up with the pull requests and making process.</p>
        <p>Giving your tech lead the support and focus they need to put those processes in place will help to make sure things like this don’t happen. At DEPT®, we have experienced Technical Project Managers with years of experience running software teams who can help coach you or run your team with just enough process to avoid chaos, but not so much that you can’t move from being tied up in red tape.</p>
      `,
    },
    {
      title: 'The Puzzled Sales Rep Asking Why You implemented That one Feature',
      body: `
      <p><em>“I was just curious why you implemented that automated contract signing feature for customers? ... That’s all cool and stuff, but um, you know we get paid on commission right? So manually signing contracts is how we actually get paid.”</em></p>
      <p>Oof, this is bad. It’s never good to spend so much on custom product development only to find out the idea itself was flawed from the start.  Or, you don’t have proper alignment if the idea is a good one.</p>
      <p>We suggest spending time with all your stakeholders in a room to develop the idea and developing non-functional prototypes using things like Figma to test your idea with real users before spending any money on custom development. Our <a href="https://www.deptagency.com/service/experience/design-sprint/">Design Sprints</a> and Strategy Practice help you make sure that your idea is crisp and testable from the very beginning. </p>
      `,
    },
    {
      title: 'The Clueless User Bug',
      body: `
        <p><em>“I just submitted a bug ticket: The sound on the app isn’t playing when the device is muted. Can you fix that ASAP? We have customers asking about it.”</em></p>
        <p>Oh my... Sometimes things just get so crazy we don’t even think about if what we’re saying makes sense. Always have empathy for your users!</p>
        `,
    },
    {
      title: 'The Abrupt CEO Request',
      body: `
        <p><img src="/images/slack-1.png"></p>
        <p><img src="/images/slack-2.png"></p>
        <p>TBD...</p>
      `,
    },
    {
      title: 'The Architecture Dumpster Fire',
      body: `
        <p><em>“I’m glad the architecture is flexible, we paid enough for it! Here’s the deal: we’re pivoting. No more TODO lists for Wine, turns out nobody needs reminders to buy cases of wine. Our new pitch is “Uber for dogs.” Guaranteed success. So it’ll take what, a few days to change the app over?”</em></p>
        <p>We’ve found that building only what you need inside simple architectures, and avoiding Premature Abstractions is the key to success and staying nimble.  We run <a href="https://www.deptagency.com/service/engineering/technology-strategy-architecture/">Architecture Sprints</a> help get projects off on the right foot with these principles in mind. Also, if your CEO is proposing what you think is a horrible idea (looking at you, Uber for dogs!), a <a href="https://www.deptagency.com/service/experience/design-sprint/">Design Sprints</a> might help get the right people in the room and test the idea with real users before you spend money and effort on it.</p>
      `,
    },
  ],
}
