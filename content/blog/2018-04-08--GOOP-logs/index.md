---
title: "GOOP logs"
date: "2018-04-08T09:00:00.009Z"
tags: ["goop"]
---

GOOP does not have a logo yet. I have to make one. 

**Before doing anything else, I have to know about Jeff's business clearly. Otherwise, I cannot create a logo that is most suitable for the public and for Jeff's (my) team.**

Ok. so this is the overview of Jeff's business. I tried to just digest the content from what Jeff has provided me and what we talked about for the meeting and produce it here. Copying directly from what Jeff provided me (i.e. evernote and other presentation materials) wouldn't mean anything.

* **Brand name:** GOOP (Good for groups)
* **Basic idea:** The business provides technology based solution for any groups of people who would need to make decisions after discussion and expression of opinions. This could be basically applied to any mainstream chatting platforms (Facebook Messenger, Whatsapp, or whatever ... yeah. so in this context, it would be better if these apps offer a place for third-party plug-in modules which would make it an easy job.). For now, FB messenger would be the most suitable platform for us to just settle down first. But we will see. 
* **What's the thing on opinion expression and decision making?:** So basically, when you are in a group, and try to discuss something to agree on as a group (perhaps most times, remotely, but it doesn't necessarily have to be like that), you face problems. It just gets messy. no system. many opinions. don't know what to choose. you need to search for the best option possible and so on. and GOOP will resolve this problem.
* **What?? technology solution?:** Open up GOOP and choose options, and it will take care of the rest of the process through an intelligent algorithm. "GOOP's algorithm ranks suggestions by the principle of Maximimum Preferences Combinations."
* **Features:** simple inputs (easy UX with intuitive search--tab. tab. tab. no manual search), various modules (schedule, food, movie ... and so on). 
* **Target market:** Basically anywhere where you need to make a decision and anybody who have to make a decision. Intuitively university students would need lots of group decision making and restaurants (food) and theatres (movies) would be the usual, popular places they need to make a decision on.
* **Main business items:**
    1. GOOP Food. You are with a bunch of friends and want to find out what to do (especially in this item, what to eat). This fits well down along with what GOOP is able to provide. 
    2. GOOP Event. This is for event organizers. By using GOOP and as long as message recipients agree on getting a message from event organizers, they (event organizers) can send out messages to audiences (event comers) and exhibitors. Organizers just need a "dedicated portal in making announcements/reminders to all exhibitor teams with just a click" and exhibitor teams get "customized and unique information that is related to their participation in the event". Event organisers also would want to update on those who are interested in their events. So send away a message instantly to Facebook message subscribers(?) and "every audience receives tailor-made updates/reminders on event items they are interested in"


### QUESTIONS TO ASK ABOUT THE BRAND

1. Who are you?
2. What do you do, and why?
3. What do you promise your customers?
4. What is your unique selling point (“We are the only company to [provide this service]”)

I found answers to these questions in the previous post.

Now, i need to find answers to:

1. What is your story?
2. What is your future?
3. Who are your competitors?
4. Who loves or may love you, and why?
5. Are you going to influence the lifestyle of your customers and how?
6. What emotions do you want to evoke in your customers?
    
Alright. Here's an answer from Jeff (Really detailed. I love it, Jeff):

### 1. What is your story?
As GOOP:
It was the brainchild of 3 of us after several pivoting. We started off with an idea of building a chatbot cause we thought building another App is too mainstream - to be exact, we wanted to become the Google of chatbots. We were overly ambitious to be the "Chatbot of all chatbots" (much like Lord of the Rings LOL) - we wanted to be the platform where everyone just needed to type what they had in mind and we would look for the corresponding chatbot for them. 
We spent so much time stuck in this paradox - we want to be a platform for chatbot, but to attract developers to adopt us, we will need to be offering them something valuable (e.g. NLP/Machine Learning); we obviously did not have the resources to develop these and it will have only put us in competition against giants like Facebook M. 

So we gave up on the idea. Then we did some more meetings and brainstorming sessions. We finally settled for a direction that is relatively untapped -> Chatbot for groups. We figured that what group needs is similar to what individual needs - people as a group still need to think about what to eat, where to watch movie, hail uber, schedule their time, etc. The only difference is, there is one more factor to consider in a group setting - communications. We followed this logic and developed more on the idea and we ended up with GOOP. What GOOP is solving is to untangle the complications in group communications/interactions - finding food to eat or movie to watch or Uber to hail or whatever are just few of the countless occasions where groups need to communicate and interact. Building a chatbot version of Yelp won't change anything - the real problem GOOP is solving here is to understand the social dynamics and fundamentally change the way groups communicate and interact using technology. 

We settled for this idea we went on and built a prototype - GOOP Schedule - a module that helped group members come up with mutually available time for meetups. We deployed in Telegram and asked a couple of our friends to do a user testing. Their comment was inspirational - "we don't like how GOOP is constantly responding and sending messages in our groups, not to mention it's not intuitive for a non-tech user to learn about entering command for GOOP to understand - it's almost annoying." That was when we understood the "chat" element in the bot was not our way to go. 

There, we pivoted our idea once again and adopted a more "visual" approach for GOOP rather than a conversational one. Our plan was that, after users added GOOP in their group and initiated a module, say food, GOOP will send a unique link to their group - yup, a really primitive method of doing stuff. Accessible only by the group members, they can click on the link and will be redirected to a UI where everyone can express their preferences and everyone can see what everyone else has selected. GOOP will then look for suitable recommendations that suit as many preferences as possible. This is the idea of "collaborative search". Instead of factoring in only the input of a single individual like Google, GOOP searches results based on inputs/input combinations of multiple individuals. We perceived this as our first insight on understanding social/group dynamics and have been sticking with this principle since then.

It was only until recently that things are becoming better. As you've known, sending links to groups, not mention needing to add a robot into a group full of humans, are pretty bad UXs. Honestly we really doubted anyone will even be willing to try it out. But then, few days ago, after F8 (annual Facebook Conference), we discovered Facebook Messenger started supporting Extensions in group conversations. It was great news to us as this means our idea finally has a legitimate means of implementation - and legitimacy = more familiar UX. So in summary, GOOP now positions as a Facebook Messenger Extension that changes the way groups communicate, starting with the solution towards what to eat. Now all we need is development and exposure. Peter and Jonathan are handling development and we will be getting our first exposure in the E-sports event held in August. 

### 2. What is your future?
There are 2 visions we have for GOOP. 
1st - User Side
We envision GOOP to be endorsed by big players in the Instant Messaging Industry - Facebook Messenger, Whatsapp, WeChat, Kakao Talk, Line etc. We want GOOP to be so good that our users help us convince these big players to include us in their softwares. Regardless of the Apps they are using, all users experience the same GOOP UI - we want GOOP to fundamentally change the way groups organize their interactions for the better, something that technology should have done for humanity long time ago.

2nd - Developer Side
As previously mentioned, occasions where group makes communication are almost infinite. There's no way an internal development team could handle that. Therefore, another of our vision is that GOOP will become an open platform where developers/companies around the world can make modules for group communication occasions. In other words, we still want to become like Google, but Google for Group Communication - and we intend to do that by creating a whole new ecosystem.

### 3. Who are your competitors?
Everyone in the social communications technology industry can potentially be our competitor. Likely ones include Facebook, WeChat, Google (Google's Allo to be precise), Apple (iMessage). They have the user mass, the technical resources and the money. Realistically, we are not trying to outdo them at this point. Our aim now is to build GOOP to be good enough it puts us on the map, gets them to realize that such need exists and we are solving them nicely. Once we've done that, we will figure out what to do next from there.

In fact, it really depends on how you see the word "competitor". If competitor means two or more parties doing similar things and are trying to outdo each other, there are eventually only 3 outcomes - GOOP outdoes them or gets outdone, or we collaborate to create greater things than each of us could have achieved on our own - we prefer the third option.

### 4. Who loves or may love you, and why?
Humanity in general. Haha jk.
First, I'm thinking the second batch of the Tech Generation - those from the Post-80s to the millenials. They either adopted or grew up with instant messaging and Smartphones. This means their default mindset on group communications is likely to be one with Instant Messaging groups. (unlike the Pre-80s that think group communications mean thick email threads or only physical meet-ups) With the default on Messaging Groups, they feel the most acute problem in group message conversations and how troublesome it can be. The bigger the pain-point, the more likely they will adopt GOOP.

Second, customer-focused companies may love us as well. This could mean Uber, Airbnb, Cinema Lines, Yelp and so on. As you may have noticed, GOOP engages its users as an entire "social group" as a whole - group of foodies, group of movie-lovers, group of musicians. No one has ever done that before. For instance, when Nike posted a new pair of shoes on Instagram, you and you only will see that picture and start to decide whether to buy it or not. Even if you share the pic and ask for your friends' opinions in your Nike-shoe-lover Whatsapp group and you did end up deciding to buy the shoes, all Nike gets from this transaction is 1 additional sales from you alone. What if a Nike module is available on GOOP? This module can recognize your group of friends' preferential trend on shoes and give you corresponding suggestions. So now, your bunch of Nike-shoe-lover friends see several pairs of cool shoes in the messaging group. You all can engage in an enthusiastic discussion and talk about how stylish they are. Then, because of your peer's positive opinions, 5 of you decided to buy a pair of shoes. Oh and wait, the module recognizes you are making a big purchase so it decides to give you a 30% off discount, so the 1 remaining friend who was hesitant of the price decided to jump in as well. Now because of GOOP, Nike has sold 6 pairs of shoes instead of 1. This applies not only to commodity, but to service as well. Think Uber car-pooling, Airbnb multiple rooms booking discount, and pretty much anything else. The opportunities GOOP can present are endless.

### 5. Are you going to influence the lifestyle of your customers and how?
Definitely. We want GOOP to replace lines of confusing messages and meaningless discussions in a messaging group. When deciding what to get for dinner, instead of the pain-in-the-ass Q&A style like this:
"What should we get for dinner?"
"I dunno. Whatchu have in mind?"
"Somewhere nearby?"
"Sure."
"Japanese Food?"
"Nah, too pricey."
"Thai?"
"Dude Thai's really spicy."
(This could go on forever, until they eventually settled for a McDonald's nearby.)

GOOP users only need to tap and open the GOOP Food UI. Select their own preferences, then hit done to find the perfect restaurant. Everyone walks away happy and content. 

### 6. What emotions do you want to evoke in your customers?
* Convenient (Core emotion - if GOOP ain't faster than what's available, i.e. an App, no one would be using us),
* Fun (They are using GOOP with a bunch of friends. Friends have fun when they interact, so GOOP's UX should make sure of that),
* Surprised (GOOP is essentially doing what an individual could not have done - integrating everyone's preference and give recommendations based on various combinations of preference. You don't even need to care about what your friends have chosen, GOOP will do that for you. Just sit and wait what GOOP comes up with and be surprised that there really exists an option where everyone can be satisfied)

## Finding the color palette and font
please kindly look at the **[post from this link](https://7oel.weebly.com/4-finding-the-color-palette-and-font.html)**.

## Research

### 1. First, you should find logos of other companies in the same/similar area of business (worldwide) — as many as you can. This is your first (market) research.

Ok. here we go. I just researched businesses not necessarily in the exactly the 'same' area (group communication), but rather tried to include wider breadth of businesses/apps in areas like group work, student-problem-solving tools, collaborative tools, messaging, human to human interactions, decision making/search tools, discussion boards, debates and so on):

![1](https://7oel.weebly.com/uploads/9/5/6/3/95631532/logosinthisfieldartboard-1_orig.png)

### 2. Sometimes a company name contains nouns that you can easily visualize. Find as many logos as possible with them.

Ok. Now I need to pick up on some keywords (nouns / verbs / adjectives) and get some inspirations from existing designs with those keywords. Ok. here are some keywords ( + emotional invocations Jeff wanted to have on customers) that I could think of from GOOP. Then, I basically scrapped them all into one artboard. So Im kinda making a mood board. Bear in mind that this is not only an emotional thing, but also im looking into things like techniques and colors used. The bold impressions are the ones Jeff and Peter emphasized. Other ones are to be 'additional' only.

* **Fun**
* **Easy**
* **Smart**
* Friends
* Social
* Bright
* Friendly
* Active
* Young

![2](https://7oel.weebly.com/uploads/9/5/6/3/95631532/inspirationsfromwords_orig.png)

## Logo

I know this is pretty ugly, but I have to show my thinking process anyways. And plus, I don't draw, the computer does. So it's ok to be bad at drawing. Don't be mad at me. Alright? Ok. So here it is:

![1](https://7oel.weebly.com/uploads/9/5/6/3/95631532/kakaotalk-photo-2017-04-25-23-36-24-14_orig.jpeg)
![2](https://7oel.weebly.com/uploads/9/5/6/3/95631532/kakaotalk-photo-2017-04-25-23-36-25-21_orig.jpeg)
![3](https://7oel.weebly.com/uploads/9/5/6/3/95631532/kakaotalk-photo-2017-04-26-00-24-23-98_orig.jpeg)
![4](https://7oel.weebly.com/uploads/9/5/6/3/95631532/kakaotalk-photo-2017-04-26-00-24-25-89_orig.jpeg)

and then, i tried to make them into feasible figures. also, I tried to make versions of one logo style of little bit of variations, so that clients (our team) may choose a better logo/get unexpected inspirations. Below here, I am throwing in the logos that I made.

![5](https://7oel.weebly.com/uploads/9/5/6/3/95631532/faces-invertartboard-1_orig.png)
![6](https://7oel.weebly.com/uploads/9/5/6/3/95631532/facesartboard-1_orig.png)
![7](https://7oel.weebly.com/uploads/9/5/6/3/95631532/speechbubble-samedirectionartboard-1-4x_orig.png)
![8](https://7oel.weebly.com/uploads/9/5/6/3/95631532/faces3-invertartboard-1_orig.png)
![9](https://7oel.weebly.com/uploads/9/5/6/3/95631532/logo-ver11_orig.png)

## Making the landing page

(https://9oelm.github.io/GOOP/)[https://9oelm.github.io/GOOP/]

# Goop now
I worked on [GOOP](https://goop.ai)'s project together with Jeff & Peter even before they started building a service. You can see my related posts on that. 

I had to go to the military after providing the design and the website for Goop. So I could no longer work for Goop after like 2017 June. That was it. A job only for a month. And now I became curious on how Goop's doing, so I checked on them.

## Present
As of now, GOOP has been pretty successful! 
GOOP has:
- penetrated more than 1/3 of the population in HKU
- [been downloaded 10K+ times on Google Play](https://itunes.apple.com/us/app/goop-where-good-friends-stay/id1260299914?ls=1&mt=8). Stats not shown on App Store. 
- [got 1K+ likes on Facebook](https://www.facebook.com/goop4groups/?ref=goop). 

Yeah, true that. I have only contributed at the beginning for the logo, design, and landing page, but it was really a worthwhile experience, looking back--especially because Goop has made such a success now. 
