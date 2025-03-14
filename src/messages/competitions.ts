import type { Competition } from "../interfaces"
import { formatCompInstructions } from "./bot-response"
import { phishes } from "./phishes"
import { phishesAnswers } from "./phishes-answers"

export const competitions: Competition[] = [
  // WEEK 1
  {
    slug: "minis_cs_wk01_01",
    week: 1,
    category: "Cybersecurity",
    name: "Sus or Trust",
    instructions: formatCompInstructions(
      1,
      "cybersecurity",
      "Is this password **TRUSTworthy** or **SUSworthy**?🕵️"
    ),
    prompt: `**Password:** 2MuchFun!`,
    inputType: "button",
    options: ["Trust", "Sus"],
    correctAnswer: ["Sus"],
    onSuccessMessage: "🎉 You got it! `2MuchFun`! is a SUS-worthy password! ",
    onWrongMessage:
      "❌ Oops! `2MuchFun` isn't strong enough! It's actually pretty sus tbh.",
  },
  {
    slug: "minis_cc_wk01_01",
    week: 1,
    category: "Content Creation",
    name: "Patent That pt.1",
    instructions: formatCompInstructions(
      1,
      "contentCreation",
      `Our latest product, **"NoCrastination”** helps students stop procrastinating. Help us create a Slogan using **ONLY Emojis**! The best slogan will be featured on **The NØTWØRK**!\n\n\u200B\nIf you're on a computer, click the "Answer Button" and then do one of the following to select your emojis:\n1. \`Mac\`: ctrl + cmd + space bar\n2.\`Windows\`windows + period (.)`
    ),
    inputType: "text",
  },
  {
    slug: "minis_ds_wk01_01",
    week: 1,
    category: "Data Science",
    name: "Guess the Graph pt.1",
    instructions: formatCompInstructions(
      1,
      "dataScience",
      "🐈 **What does this Graph Represent?** 🐶"
    ),

    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/Dogs_vs_Cats.webp",
    prompt: ``,
    inputType: "dropdown",
    options: [
      "How long each pet likes to hang out with you",
      "How long people like to hang out with each pet",
      "How much the pet misses you while you're away",
      "Level of overall chillness",
    ],
    correctAnswer: ["How much the pet misses you while you're away"],
  },
  // WEEK 2
  {
    slug: "minis_cs_wk02_01",
    week: 2,
    category: "Cybersecurity",
    name: "Sneakin or Tweakin",
    instructions: formatCompInstructions(
      2,
      "cybersecurity",
      "Identify the number of weaknesses in the given password! 🔒"
    ),
    prompt: `**Password:** Example123`,
    inputType: "button",
    options: ["1", "2", "3", "4"],
    correctAnswer: ["4"],
    onSuccessMessage:
      "🎉 You got it! `Example123` has 4 weaknesses! It is too short, the letters used form a simple word, the numbers are in a stereotypical order, and there are no special characters.",
    onWrongMessage:
      "❌ Oops! That is incorrect. `Example123` has 4 weaknesses! It is too short, the letters used form a simple word, the numbers are in a stereotypical order, and there are no special characters.",
  },
  {
    slug: "minis_cc_wk02_01",
    week: 2,
    category: "Content Creation",
    name: "Patent That pt.2",
    instructions: formatCompInstructions(
      2,
      "contentCreation",
      "Write a caption for a post, advertising our latest product: **NoCrastination**. The best caption will be used in the post on the NØTWØRK! 📝 "
    ),
    image:
      "https://github.com/Stiegler-EdTech/mini-comp-bot/blob/main/images/NoCrastination_SM_Post.jpeg?raw=true",
    inputType: "text",
  },
  {
    slug: "minis_ds_wk02_01",
    week: 2,
    category: "Data Science",
    name: "Guess the Graph pt.2",
    instructions: formatCompInstructions(
      2,
      "dataScience",
      "See if you can guess what the graph is representing! 📊"
    ),

    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/TV_Consumption.webp",
    inputType: "dropdown",
    options: [
      "Finding something to watch vs. watching it",
      "Amount of sugar in a Pixy Stix vs protein",
      "Ratio of people to penguins in Antarctica",
      "Ratio of people who prefer dogs to Chameleons",
    ],
    correctAnswer: ["Finding something to watch vs. watching it"],
  },
  // WEEK 3
  {
    slug: "minis_cs_wk03_01",
    week: 3,
    category: "Cybersecurity",
    name: "Phind the Phish 🎣🎣",
    instructions: formatCompInstructions(
      3,
      "cybersecurity",
      "Is this email phishing or totally phine (safe)?"
    ),
    prompt: phishes,
    inputType: "button",
    options: ["Phish", "Safe"],
    correctAnswer: ["Phish"],
    onSuccessMessage: `🎉 You got it! This is a phish 🐟. It’s too good to be true, uses urgency tactics, a non-school email, and fake verification.`,
    onWrongMessage: `❌ Oh no, you got PHISHed 😳🎣🎣😱!! This email is a **scam**.

🚩 **Red Flags:**

**Too Good to Be True** (free pizza just for being a student?), **urgency tactic** (“Expires in 24 hours!”) to rush you into clicking without thinking, a non-school **email domain** (@school-perks.com), & **fake verification request** (student ID & school email)

🔍 **How to Spot Phishing Emails**
- **Check the sender’s email:** Does it match the official domain?
- **Look for urgency tactics:** Phishers try to rush you into acting.
- **Verify links:** Hover over links before clicking to see the real URL.`,
  },
  {
    slug: "minis_cc_wk03_01",
    week: 3,
    category: "Content Creation",
    name: "Patent That pt.3",
    instructions: formatCompInstructions(
      3,
      "contentCreation",
      `Branding is what makes a company stand out ✨—just like a logo!
      
Guess the company from this zoomed-in logo 🔍`
    ),
    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/week3_logo.webp",
    inputType: "dropdown",
    options: ["Razer", "SteelSeries", "Corsair", "HyperX"],
    correctAnswer: ["HyperX"],
    onSuccessMessage: `🎉 **You got it**! This logo is for **HyperX**.

HyperX has a strong, recognizable logo that stands out with its sleek, modern design and bold typography 🔠. The dynamic ‘X’ adds a sense of speed and precision, making it instantly identifiable in the gaming and esports world 🎮.`,
    onWrongMessage: `❌ Not quite! Here are the qualities of a strong logo:

✅ **Simplicity** – Clean, uncluttered, and easy to recognize.

✅ **Memorability** – Unique and instantly identifiable.

✅ **Versatility** – Looks great on any size or medium.

✅ **Relevance** – Matches the brand’s identity and industry.

HyperX has a strong, recognizable logo that stands out with its sleek, modern design and bold typography. The dynamic ‘X’ adds a sense of speed and precision, making it instantly identifiable in the gaming and esports world.`,
  },
  {
    slug: "minis_ds_wk03_01",
    week: 3,
    category: "Data Science",
    name: "Name that Chart",
    instructions: formatCompInstructions(
      3,
      "dataScience",
      "This chart groups numbers into bins to show frequency. What is this graph called? 📊"
    ),
    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/week3_chart.webp",
    inputType: "dropdown",
    options: ["Bar Chart", "Histogram", "Box Plot"],
    correctAnswer: ["Histogram"],
    onSuccessMessage: `🎉 **You got it**! This is a **Histogram**.

A giveaway is that a **Histogram** has **touching bars**. Bar charts use separate groups to compare categories, box plots show a data spread, Histograms have touching bars that compare measurements over a given range.

*Think about how these could be used in the Esports season:*

-   **Histogram:** shows how many Fortnite players got different kill counts in matches (0-2 kills, 3-5 kills, 6-8 kills) 🔫
-   **Bar Chart:** compares the number of students who prefer different games (Fortnite, Minecraft, Rocket League) ⚽🔫👾
-   **Box Plot:** summarizes match scores by showing the middle score, average range, and any unusually high or low outliers 👥`,
    onWrongMessage: `❌ Not quite! This is a **Histogram**.

A giveaway is that a **Histogram** has **touching bars**. Bar charts use separate groups to compare categories, box plots show a data spread, Histograms have touching bars that compare measurements over a given range.

*Think about how these could be used in the Esports season:*

-   **Histogram:** shows how many Fortnite players got different kill counts in matches (0-2 kills, 3-5 kills, 6-8 kills) 🔫
- **Bar Chart:** compares the number of students who prefer different games (Fortnite, Minecraft, Rocket League) ⚽🔫👾
- **Box Plot:** summarizes match scores by showing the middle score, average range, and any unusually high or low outliers 👥
    `,
  },
  // WEEK 4
  {
    slug: "minis_cs_wk04_01",
    week: 4,
    category: "Cybersecurity",
    name: "Caesar Cipher",
    instructions: formatCompInstructions(
      4,
      "cybersecurity",
      `Decrypt a message using the Caesar Cipher. To decode, shift each letter backwards 🔙 3 letters. For example: D = A, E = B, F = C\n\u200B\n**What is the secret message?**🔐`
    ),
    prompt: `Krs Rq Wkh Jdph`,
    inputType: "dropdown",
    options: [
      "Get on the grind",
      "Join the lobby",
      "Press start to play",
      "Hop on the game",
    ],
    correctAnswer: ["Hop on the game"],
    onSuccessMessage: `🎉 **You got it!** "Hop on the game" is the correct phrase!

**Caesar ciphers** work by shifting letters forward ➡️ in the alphabet, making a simple yet effective way to *encode* messages. To *decode*, letters shift backwards ⬅️`,
    onWrongMessage: `❌ Access denied! This message decoded says “**Hop on the game**”

This example highlights how **Caesar ciphers** can be tricky if you don't decode the shift correctly. Since letters are shifted in the alphabet, guessing the wrong phrase means the pattern wasn’t fully cracked.`,
  },
  {
    slug: "minis_cc_wk04_01",
    week: 4,
    category: "Content Creation",
    name: "Patent That pt.4",
    instructions: formatCompInstructions(
      4,
      "contentCreation",
      `Colors make a brand memorable ⭐\n\u200B\nGuess the company from their colors 🎨`
    ),
    image: `https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/brand-colors.webp`,
    inputType: "dropdown",
    options: ["Pepsi", "TikTok", "T-Mobile", "GoPro"],
    correctAnswer: ["TikTok"],
    onSuccessMessage: `🎉 **You got it!** These are **TikTok’s** colors.

TikTok's bold and vibrant branding makes it instantly recognizable 📱. The combination of black, cyan, and magenta gives it a modern, energetic feel, reflecting its fast-paced, creative community 🖤🩵🤍🩷.`,
    onWrongMessage: `❌ Not quite! Here are the qualities of a strong logo:

✅ Simple – Clean, uncluttered, and easy to recognize.

✅ Memorable – Unique and instantly identifiable.

✅ Versatile – Looks great on any size or medium.

✅ Relevant – Matches the brand’s identity and industry.

TikTok’s logo is bold and instantly recognizable with its **sleek, modern typography and vibrant color scheme** 🎨. The combination of black, cyan, and magenta reflects its dynamic, fast-paced, and creative community, making it stand out in the world of social media.`,
  },
  {
    slug: "minis_ds_wk04_01",
    week: 4,
    category: "Data Science",
    name: "Data Pattern Recognition",
    instructions: formatCompInstructions(
      4,
      "dataScience",
      `Look at the pattern in the numbers, see if you can figure out what the pattern is. 🔎\n\u200B\n**What comes next in the sequence**`
    ),
    prompt: "Sequence: 5, 15, 35, 65, ??",
    inputType: "button",
    options: ["95", "105"],
    correctAnswer: ["105"],
    onSuccessMessage: `🎉 **You got it!** The correct answer is **105!**
    
    You cracked the pattern by spotting the increasing differences (+10, +20, +30, +40). You're thinking like a data expert, spotting patterns and making logical predictions like a pro 😎`,
    onWrongMessage: `❌ Close! The next number is 105.

The pattern in this sequence follows increasing differences (+10, +20, +30, +40).

**Here’s how you can crack it next time:**
1️⃣ Check the differences between each number to spot a pattern.
2️⃣ Look for a consistent rule (in this case, the difference increases by 10 each time).`,
  },
  // WEEK 5
  {
    slug: "minis_cs_wk05_01",
    week: 5,
    category: "Cybersecurity",
    name: "Atbash Cipher",
    instructions: formatCompInstructions(
      5,
      "cybersecurity",
      "Decrypt this message using the Atbash (Substitution) Cipher key. Use the image below as a guide. To decode the message, you'll need to flip the alphabet and transpose the letters onto the encrypted message. **Be sure to use ONLY lowercase letters:**"
    ),
    image:
      "https://www.wikihow.com/images/thumb/b/b9/Create-Substitution-Ciphers-Step-3.jpg/aid309898-v4-728px-Create-Substitution-Ciphers-Step-3.jpg",
    prompt: `xsznkrlmh dlip zh z gvzn`,
    inputType: "text",
    correctAnswer: ["champions work as a team"],
  },
  {
    slug: "minis_cc_wk05_01",
    week: 5,
    category: "Content Creation",
    name: "Patent That pt.5",
    instructions: formatCompInstructions(
      5,
      "contentCreation",
      "Help the content creation team come up with a clever meme to post in support of our latest product **NoCrastination**."
    ),
    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/NoCrastination_meme_2.webp",
    prompt: `Fill in the blanks for this meme by clicking the button below and filling in the input.`,
    inputType: "text",
  },
  {
    slug: "minis_ds_wk05_01",
    week: 5,
    category: "Data Science",
    name: "Is it an Outlier?",
    instructions: formatCompInstructions(
      5,
      "dataScience",
      "Examine the highlighted data point. Does it seem to be an outlier compared to the rest of the data set?"
    ),
    prompt: `Data Set: [21, 22, 20, 21, 23, 22, 21, 37, 22]\nHighlighted Data Point: 37`,
    inputType: "button",
    options: ["Yes", "No"],
    correctAnswer: ["Yes"],
    onSuccessMessage: "Correct! 37 is much higher than the other numbers.",
    onWrongMessage:
      "Not quite! 37 is way above the typical range of 20-23, making it an outlier.",
  },
  // WEEK 6
]
