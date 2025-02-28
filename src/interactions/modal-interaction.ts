import type { ModalSubmitInteraction } from "discord.js"
import { MessageFlags } from "discord.js"
import { defaultBotResponse } from "../messages/bot-response"
import { competitions } from "../messages/competitions"
import updateBubble from "../utils/update-bubble"

const userModalResponses = new Map<string, Set<string>>()

export default async function onModalSubmitInteraction(
  interaction: ModalSubmitInteraction
) {
  const response = interaction.fields.getTextInputValue("competition_response")
  const competitionName = interaction.customId.replace("modal_", "")
  const competition = competitions.find((comp) => comp.name === competitionName)

  if (!competition) {
    return interaction.reply({
      content: `❌ Unable to find competition: **${competitionName}**`,
      flags: [MessageFlags.Ephemeral],
    })
  }

  const messageId = interaction.message?.id
  const userId = interaction.user.id

  if (messageId) {
    // Initialize map entry if needed
    if (!userModalResponses.has(messageId)) {
      userModalResponses.set(messageId, new Set())
    }

    const respondedUsers = userModalResponses.get(messageId)!

    // Prevent duplicate submissions
    if (respondedUsers.has(userId)) {
      return interaction.reply({
        content:
          "❌ You have already submitted a response for this competition.",
        flags: [MessageFlags.Ephemeral],
      })
    }

    // Mark user as having submitted a response
    respondedUsers.add(userId)
  }

  // If `correctAnswer` exists, validate it
  if (competition.correctAnswer) {
    const isCorrect = Array.isArray(competition.correctAnswer)
      ? competition.correctAnswer.includes(response.trim())
      : competition.correctAnswer === response.trim()

    await interaction.reply({
      content: isCorrect
        ? competition.onSuccessMessage || "✅ Correct answer! 🎉"
        : competition.onWrongMessage ||
          `❌ Incorrect answer. The correct answer was: **${competition.correctAnswer}**.`,
      flags: [MessageFlags.Ephemeral],
    })
  } else {
    // If `correctAnswer` does not exist, just acknowledge the response
    const plug = `You just got **500** Silver Coins:money_with_wings: :moneybag:! Head on over to [The NØTWØRK](https://thenotwork.org/challenges)`

    await interaction.reply({
      content: `${defaultBotResponse("onSuccessMessage")}\n\u200B\n${plug}`,
      flags: [MessageFlags.Ephemeral],
    })
  }

  await updateBubble({
    interaction: interaction,
    competition: competition,
    user_response: response.trim(),
  })
}
