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
      "Identify which of these emails might be phishing attempts."
    ),
    prompt: phishes,
    inputType: "dropdown",
    options: [
      "A bunch of Phishes",
      "All Safe",
      "Safe, Phish, Phish",
      "Safe, Safe, Phish",
      "Phish, Safe, Safe",
    ],
    correctAnswer: ["Safe, Phish, Phish"],
    onSuccessMessage: `🎉 You got it! The second and third emails are PHISHes. \n\n${phishesAnswers}`,
    onWrongMessage: `❌ Oh no, you got PHISHed 😳🎣🎣😱!! The second and third emails are the PHISHes. \n\n${phishesAnswers}`,
  },
  {
    slug: "minis_cc_wk03_01",
    week: 3,
    category: "Content Creation",
    name: "Patent That pt.3",
    instructions: formatCompInstructions(
      3,
      "contentCreation",
      `MaRKeT reSEarCh suggests that many students struggle with ProRASstiNAtiOn. Stiegler EdTech has created a product that is sweeping the nation. This new product is called **NoCrastination**. We need your help to create a logo for this product. Think of a logo that is fun, memorable, and descriptive of the product idea. The best logo will be used in a post on the NØTWØRK!\n\u200B\nTry using tools like Leonardo.ai or Canva to generate images or create custom designs. Draw some inspiration from the logo shown below.`
    ),
    image:
      "https://github.com/Stiegler-EdTech/mini-comp-bot/blob/main/images/NoCrastinationLogo.jpeg?raw=true",
    prompt: "",
    inputType: "image",
  },
  {
    slug: "minis_ds_wk03_01",
    week: 3,
    category: "Data Science",
    name: "Chart Type Match",
    instructions: formatCompInstructions(
      3,
      "dataScience",
      "Identify the type of chart shown below."
    ),
    image:
      "https://github.com/Stiegler-EdTech/mini-comp-bot/blob/add-data-science/images/Histogram.png?raw=true",
    prompt: `This chart groups numbers into bins to show frequency. What is it called?`,
    inputType: "dropdown",
    options: ["Bar Chart", "Histogram", "Box Plot"],
    correctAnswer: ["Histogram"],
    onSuccessMessage: `✅ Awesome, you got that right! A giveaway is the Histograms have touching bars and compare measurements over a given range.\nThink about how these could be used in the Esports season:
- **Histogram:** shows how many Fortnite players got different kill counts in matches (0-2 kills, 3-5 kills, 6-8 kills).
-   **Bar Chart:** compares the number of students who prefer different games (Fortnite, Minecraft, Rocket League).
-   **Box Plot:** summarizes match scores by showing the middle score, average range, and any unusually high or low outliers.`,
    onWrongMessage: `❌ Not quite! It is a **Histogram**!\n\u200B\nA giveaway is that a Histogram has touching bars. Bar charts use separate groups to compare categories, box plots show a data spread, Histograms have touching bars that compare measurements over a given range.\nThink about how these could be used in the Esports season:
- **Histogram:** shows how many Fortnite players got different kill counts in matches (0-2 kills, 3-5 kills, 6-8 kills).
-   **Bar Chart:** compares the number of students who prefer different games (Fortnite, Minecraft, Rocket League).
-   **Box Plot:** summarizes match scores by showing the middle score, average range, and any unusually high or low outliers.`,
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
      "Decrypt a message using the Caesar Cipher. The Caesar cipher encodes messages by shifting each letter forward 7 letter; they wrap around at the end. For example: A = H, X = D. **Be sure to use ONLY lowercase letters:**"
    ),
    prompt: `mhza ylmslelz dpu nhtlz`,
    inputType: "text",
    correctAnswer: ["fast reflexes win games"],
  },
  {
    slug: "minis_cc_wk04_01",
    week: 4,
    category: "Content Creation",
    name: "Patent That pt.4",
    instructions: formatCompInstructions(
      4,
      "contentCreation",
      "Help the content creation team come up with a clever meme to post in support of our latest product **NoCrastination**."
    ),
    image:
      "https://raw.githubusercontent.com/Stiegler-EdTech/mini-comp-bot/refs/heads/main/images/NoCrastination_meme_1.webp",
    prompt: `Complete the text for this meme.`,
    inputType: "text",
  },
  {
    slug: "minis_ds_wk04_01",
    week: 4,
    category: "Data Science",
    name: "Data Pattern Recognition",
    instructions: formatCompInstructions(
      4,
      "dataScience",
      "What comes next in the sequence? Look at the pattern in the numbers, see if you can figure out what the pattern is. Once you do, guess the next number in the sequence!"
    ),
    prompt: "**Sequence:** 14, 98, 686, ??",
    inputType: "text",
    correctAnswer: ["4802"],
    onSuccessMessage:
      "✅ Spot on! The numbers in the sequence are being multiplied by 7 each time, so **4802** is next.",
    onWrongMessage: `❌ Oops, that's not right! The correct answer is **4802**.\n\u200B\n
The sequence multiplies each number by **7**:\n
- **14 × 7 = 98**
- **98 × 7 = 686**
- **686 × 7 = 4802**\n\u200B\n
Next time, try dividing consecutive numbers to spot the pattern! For example, \`98 ÷ 14 = 7\` shows that 98 is 7 times larger than 14. If you get the same result each time, that's the multiplier. Here, it confirms that every step multiplies by **7**!`,
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
