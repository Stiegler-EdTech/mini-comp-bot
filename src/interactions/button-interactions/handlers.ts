import {
  MessageFlags,
  ButtonInteraction,
  DMChannel,
  NewsChannel,
  TextChannel,
  ThreadChannel,
  Message,
  type ReadonlyCollection,
} from "discord.js"
import { competitions } from "../../messages/competitions"
import { createModal } from "../../utils/action-row-builders"
import updateBubble from "../../utils/update-bubble"
import { studentAnswerResponse } from "../../messages/bot-response"

// User interaction tracking map
const userInteractionMap = new Map<string, Set<string>>()

// Safely clean up the interaction map
function scheduleInteractionCleanup(
  messageId: string,
  timeoutMs = 3600000
): void {
  setTimeout(() => {
    userInteractionMap.delete(messageId)
  }, timeoutMs) // Default: clean up after 1 hour
}

// Get competition from a button's customId
function getCompetitionFromButton(customId: string, prefix: string) {
  const competitionName = customId.replace(prefix, "")
  const competition = competitions.find((comp) => comp.name === competitionName)
  return { competition, competitionName }
}

function isValidCollectorChannel(
  channel: any
): channel is TextChannel | DMChannel | NewsChannel | ThreadChannel {
  return (
    channel instanceof TextChannel ||
    channel instanceof DMChannel ||
    channel instanceof NewsChannel ||
    channel instanceof ThreadChannel
  )
}

// Safe reply to handle different kinds of interaction states
async function safeReply(
  interaction: ButtonInteraction,
  content: string,
  ephemeral = true
) {
  try {
    if (!interaction.replied && !interaction.deferred) {
      return await interaction.reply({
        content,
        flags: ephemeral ? [MessageFlags.Ephemeral] : [],
      })
    } else {
      return await interaction.editReply({ content })
    }
  } catch (error) {
    console.error("Reply error:", error)
    // Attempt a final fallback if everything else failed
    try {
      if (interaction.replied || interaction.deferred) {
        return await interaction.editReply({
          content: "⚠️ An error occurred while processing your interaction.",
        })
      } else {
        return await interaction.reply({
          content: "⚠️ An error occurred while processing your interaction.",
          flags: [MessageFlags.Ephemeral],
        })
      }
    } catch (fallbackError) {
      console.error("Critical reply error:", fallbackError)
    }
  }
}

// Check if user has already interacted
async function checkUserInteraction(
  interaction: ButtonInteraction
): Promise<boolean> {
  const messageId = interaction.message.id
  const userId = interaction.user.id

  // Initialize map entry if it doesn't exist
  if (!userInteractionMap.has(messageId)) {
    userInteractionMap.set(messageId, new Set())
    scheduleInteractionCleanup(messageId)
  }

  const interactedUsers = userInteractionMap.get(messageId)!

  // Check if user has already interacted
  if (interactedUsers.has(userId)) {
    await safeReply(
      interaction,
      "❌ You have already submitted a response for this competition."
    )
    return true
  }

  // Mark user as having interacted
  interactedUsers.add(userId)
  return false
}

// Handle answer button interactions (modal-based)
async function handleAnswerButton(
  interaction: ButtonInteraction
): Promise<void> {
  const { competition, competitionName } = getCompetitionFromButton(
    interaction.customId,
    "answer_"
  )

  if (!competition) {
    await safeReply(
      interaction,
      `❌ Unable to find competition: **${competitionName}**`
    )
    return
  }

  try {
    const modal = createModal(competition)
    await interaction.showModal(modal)
  } catch (error) {
    console.error("Error showing modal:", error)
    await safeReply(
      interaction,
      "❌ There was an error opening the submission form."
    )
  }
}

// Handle image submission button interactions
async function handleImageSubmission(
  interaction: ButtonInteraction
): Promise<void> {
  try {
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] })

    const { competition, competitionName } = getCompetitionFromButton(
      interaction.customId,
      "submit_image_"
    )

    if (!competition) {
      await safeReply(
        interaction,
        `❌ Unable to find competition: **${competitionName}**`
      )
      return
    }

    // Type guard to check if channel supports message collector
    if (!isValidCollectorChannel(interaction.channel)) {
      await safeReply(
        interaction,
        "❌ This type of channel doesn't support image submissions."
      )
      return
    }

    // Create collector before sending instructions
    const collector = interaction.channel.createMessageCollector({
      filter: (msg: Message) =>
        msg.author.id === interaction.user.id && msg.attachments.size > 0,
      max: 1,
      time: 300000, // 5 minute timeout
    })

    // Send instructions
    await safeReply(
      interaction,
      `Please upload your image in the next message.`
    )

    collector.on("collect", async (message: Message) => {
      const imageUrl = message.attachments.first()?.url

      if (!imageUrl) {
        await safeReply(interaction, "❌ No image was found in your message.")
        collector.stop()
        return
      }

      try {
        await updateBubble({
          interaction: interaction,
          competition: competition,
          user_response: imageUrl,
        })

        // Delete the uploaded image message
        try {
          await message.delete()
        } catch (deleteError) {
          console.error("Failed to delete message:", deleteError)
        }

        // Then, only if updateBubble was successful, update the reply
        await safeReply(
          interaction,
          "✅ Your image has been submitted successfully!"
        )
      } catch (error) {
        console.error("Error handling image submission:", error)
        await safeReply(
          interaction,
          "❌ There was an error processing your submission. Please try again."
        )
      }
    })

    collector.on(
      "end",
      (collected: ReadonlyCollection<string, Message>, reason: string) => {
        if (collected.size === 0 && reason === "time") {
          safeReply(
            interaction,
            "❌ Image submission timeout. Please try again."
          ).catch(console.error)
        }
      }
    )
  } catch (error) {
    console.error("Error in image submission handler:", error)
    await safeReply(
      interaction,
      "❌ There was an error processing your request."
    )
  }
}

// Handle quiz/selection button interactions
async function handleQuizButton(interaction: ButtonInteraction): Promise<void> {
  try {
    const userResponse = interaction.customId
    const competition = competitions.find((comp) =>
      comp.options?.includes(userResponse)
    )

    if (!competition) {
      await safeReply(
        interaction,
        `❌ Unable to find competition for this selection.`
      )
      return
    }

    const isCorrect = Array.isArray(competition.correctAnswer)
      ? competition.correctAnswer.includes(userResponse)
      : competition.correctAnswer === userResponse

    // Process the response
    await studentAnswerResponse(interaction, isCorrect, competition)

    // Update the bubble UI
    await updateBubble({
      interaction: interaction,
      competition: competition,
      user_response: userResponse,
    })
  } catch (error) {
    console.error("Error in quiz button handler:", error)
    await safeReply(
      interaction,
      "❌ There was an error processing your response."
    )
  }
}

export {
  getCompetitionFromButton,
  isValidCollectorChannel,
  safeReply,
  checkUserInteraction,
  handleAnswerButton,
  handleImageSubmission,
  handleQuizButton,
}
