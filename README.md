# 🌐 Privatus: An open-source privacy-based alternative to traditional social media
_**NOTE:** This version of Privatus is a prototype, it's for validating the idea, gaining traction, and testing purposes only_

## ❓ What is Privatus ❓

Privatus is an open-sourced privacy based social media app created as a better alternative to traditional social media app. Privatus promotes privacy by not collecting any kind of data about the user, other then email address used only for notification and identification purpose.

## ❓ Why Privatus ❓
Privatus isn't just a one word solution, it combines multiple(useful) ideas into one place in order to achieve these goals and be the best social media app - transparency, openness, trust, privacy, and overall well being of users.

Here is how Privatus tends to achieve these goals -

### Organic Feed 
traditional social media platforms use AI models to show you the most relevant and most highly clicked posts, this leads to unhealthy social media usage. Since _overall well-being_ is one of our goals, Privatus wants to make your online presence as healthy as it can, to prevent you from spending too much time on social media, but not entirely give up on it, Privatus generates your feed using nothing more than a list of `following`, this is a list of users you follow, if you are not following anyone Privatus will not generate a feed for you and you would need to follow someone to generate a feed. Privatus simply takes your `following` list and gets the latest posts from each user you are following and shows you those, thus making sure you are not given promoted content, high click rate posts, or any kind of addicting content.

---

### Non-personalized advertisements

Privatus believes in win-win, not win-lose, which most social media platforms follow, where the advertisers and platform wins, and the users lose. To create a win-win for everyone without hurting advertisers goal and users well-being, Privatus uses a non-personalized generalized advertisement model.

This model is similar to the technique used by DuckDuckGo. When ever you look at a post, depending on what type of post it is the same type of ads you are shown instead of a more personalized ads which depends on your search history on the platform.

For ex - If a user uses the platform to search mainly dog food, but views a post about **Cars** than the ads will be also about **Cars** and not about dog food companies.

For Advertisers there are 2 ways in which they can advertise on Privatus:

1. Bided advertisement.
2. Click advertisement.

Advertisers aren't given option between these 2, rather depending on their revenue and budget the option is selected.

#### Bided advertisement

This method is for companies with high revenue.

In bided advertisement, advertisers have to bid amount, the percent of their bid to the total amount determines how much of ads space they get. For Ex-

Company **A** wants to advertise, they are a car company, **A** bided $10M, assuming that in total all biders in ads space related to cars bid a total of $100M, company **A** will get 10 * 100/100 = 10% of total ads space allotted for car topics.

Now every month **A** needs to pay 1% of the amount they bid, now their budget, every month to keep their ad running.

This method also gives **A** insight into their competitors, such as how much competitors are bidding, who has the highest bid in their topic, and click rate on their ads with previous performance.

#### Click advertisement

This method is for companies with low revenue.

In this method, companies pay as their ads get clicked, the same usual way, except, they don't get info on competitors. For Ex-

Company **B** wants to advertise, they have an AI product, **B**'s advertisement budget is set to $500K, assuming the total amount spend by all AI advertisers was $25M, **B** gets 2% of ad space allocated to AI ads.
Now **B** pays $0.1/click.

**B** gets insight into how their ads is doing, such as click rate.

This method comes with loses, **B** doesn't get insight on how much competitors are paying and who their competitors are.

#### What's ad space?

empty white spaces left on the right hand side of only blogs are ads space. These as of now aren't utilized because the current version of Privatus is just a prototype for testing purposes. 

---

### Content Moderation

AI mods wouldn't be used as they can be modified for the benefit of the company and not the users of the platform.

Moderation would be done in a hierarchy system where there would be 4 levels of mods. Each with its own powers and limitations.

There will be 4 mods, helper mods, head mods, lead mods, and super mods:

1. **Helper mods:** Every user applying for first time is a new mod, these can only review content and make sure community policies are being followed.
2. **Head mods:** Once leveled up, head mods can temporarily ban users and can do what helper mods can do.
3. **Lead mods:** Lead mods can delete content which doesn't follow content policy and also do what helper and head mods can do.
4. **Super mods:** They can only promote mods, they can't do what other mods can do, but they can level up mods and remove mods, but not add mods. They can also permanently ban users, but with justifiable statement.

Due to having human moderators, all the posts made by users with <500K trusty points will not be published until it has been checked and verified by a moderator.

In order to let other users know that the post is verified and following content policy, each post will have a badge with each badge having a different meaning as follow -

| Badges | Meaning |
| ------ | ------- |
| Verified - {type} | The post has been checked by a moderator of {type} |
| Unverified | The author of the post is trusted but the post isn't checked by a moderator yet |
| Trusty | The user can be trusted |

---

### Trusty Point

Trusty point is a basic point based system in which users are given points when they receive likes.

For receiving trusty points the following can be done

| Event            | Points earned |
| ---------------- | :-----------: |
| Post liked       | +10           |
| Comment liked    | +50           |
| Post disliked    | -20           |
| Comment disliked | -100          |

With trusty points you get certain privileges because you only receive points when the community likes your work. These privileges are -

| Points earned | Privileges |
| ------------- | ---------- |
| +10K | Liking other's posts and comments contribute to their trusty points |
| +500K | Posts won't be stopped, but will have unverified badge on it |
| +10M | Posts won't have unverified badge, rather trusty badge |
| +100M | Given Lead mod status(optional) |
| +500M | Given trusty badge on Profile |

More privileges to come.

---

## 🔍 Comparison: Privatus vs. Decentralized
Decentralized platforms are great, individuals create them and are maintained by their users, this means that anyone can use a decentralized protocol such as Nostr or Mastodon and build a whole new platform that focuses on decentralizing social media.

But they too have their disadvantages.

### Reimagining social media

**Privatus:** Privatus wants to reimagine social media by making an all in one platform, that focuses on privacy, well-being, no to censorship, human moderators, and is community-driven.

**Decentralized:** Decentralized social media platforms aim to remove censorship, they are made as an alternative to platforms mainly like X, and they don't tend to focus much on large scale but act as small individual entities that can be used separately.

---

### Moderation

**Privatus:** Though Privatus is currently a prototype for gaining traction and validating the idea, it is planned to implement a moderation system in which anyone who applies, with certain criteria reached, will be given moderation access, this would allow the community to moderate content which it wants to flow in the platform.

**Decentralized:** Aim to avoid centralized content moderation, because of this approach, it can be challenging to address illegal or harmful content. This can lead to the free flow of illegal content on the platforms.

---

### Technical Complexity

**Privatus:** Privatus is for now as a prototype, but once it gains traction it will be made into a fully scalable platform with proper management of technical issues. Using Privatus isn't that hard, it just requires your email, an even better option is to use an email service that creates fake emails for you to use.

**Decentralized:** To use any decentralized platform it requires a bit of technical understanding. Users need to manage private keys, and wallet addresses, and understand blockchain technology. This can be intimidating and confusing for the majority of non-technical humans, thus limiting the platform’s accessibility.

---

### Feature and user experiences

**Privatus:** As mentioned before Privatus is a prototype of what the real product would be, it does not have all the functionalities of a fully functional platform. Though some features might not be available in the prototype, would be available in the production-ready version, such as community group, microblogging, private chat, trusty point and many other features that would be added to the real product.

**Decentralized:** Decentralized social media platforms do not offer the same level of features and user experiences as more established, centralized platforms do. This can make it less appealing for users who are accustomed to the convenience and polish of mainstream social media networks. Also taking into account, majority of these platforms act as alternatives only to X and not the entire social media market.

Privatus wants to make your online experience better, focus on the stuff you want, not what you don't want but still keep getting.

---

## How to contribute ❓

Privatus functions because of its users, you give the idea, we implement the idea, 

> _its for the people, by the people, of the people_

<i>- Abraham privacy</i>

To get started just hope over to the issue tab and write down an issue!

If it's a code solution that you might have, just use the [contribute.md file](https://github.com/ezpie1/Privatus-official/blob/main/CONTRIBUTING.md)

---

## How can you help?

First of all, if you are reading this section, thanks a lot for showing interest and wanting to help Privatus become the next big thing. Privatus is nothing without its users.

To help Privatus grow, please go ahead and share about Privatus to your network, and share it with your friends, family members, and co-workers. For every new sign-up the prototype version of Privatus gets, it adds more and more trust and support to Privatus.

It's more the better.

Once again thanks for showing support 😃.

**Current number of signups:** _78_(17 Feb 25)