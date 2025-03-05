import {
  MessageFlags,
  DMChannel,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js"
import type { ButtonInteraction, Message, ReadonlyCollection } from "discord.js"
import { competitions } from "../../messages/competitions"
import { createModal } from "../../utils/action-row-builders"
import updateBubble from "../../utils/update-bubble"
import { studentAnswerResponse } from "../../messages/bot-response"
import {
  checkUserInteraction,
  handleAnswerButton,
  handleImageSubmission,
  handleQuizButton,
  safeReply,
} from "./handlers"

export default async function onButtonInteraction(
  interaction: ButtonInteraction
): Promise<void> {
  try {
    // Check if user has already interacted with this message
    const hasInteracted = await checkUserInteraction(interaction)
    if (hasInteracted) return

    // Handle different button types
    if (interaction.customId.startsWith("answer_")) {
      await handleAnswerButton(interaction)
    } else if (interaction.customId.startsWith("submit_image_")) {
      await handleImageSubmission(interaction)
    } else {
      await handleQuizButton(interaction)
    }
  } catch (error) {
    console.error("Error handling button interaction:", error)
    await safeReply(
      interaction,
      "⚠️ An error occurred while processing your interaction."
    )
  }
}
