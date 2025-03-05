import {
  Client,
  GatewayIntentBits,
  Collection,
  MessageFlags,
  DiscordAPIError,
} from "discord.js"
import type {
  ButtonInteraction,
  Interaction,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
} from "discord.js"
import { BOT_TOKEN } from "./config"
import { miniBatchCommand, startCommand } from "./commands/index"
import {
  onButtonInteraction,
  onModalSubmitInteraction,
  onStringSelectMenuInteraction,
} from "./interactions/index"

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

const commands = new Collection<string, any>()
commands.set(startCommand.data.name, startCommand)
commands.set(miniBatchCommand.data.name, miniBatchCommand)

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user?.tag}`)
})

function isInteractionFromCurrentENV(
  interaction:
    | ButtonInteraction
    | StringSelectMenuInteraction
    | ModalSubmitInteraction
) {
  if (
    interaction.message &&
    interaction.message.author.id !== client.user?.id
  ) {
    console.log("Interaction not from current ENV")
    return false // Ignore interactions from the other bot (testing vs prdo)
  }
  console.log("Interaction IS from current ENV")
  return true
}

client.on("interactionCreate", async (interaction: Interaction) => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName)
      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({
          content: "❌ There was an error executing this command!",
          flags: [MessageFlags.Ephemeral],
        })
      }
    } else if (interaction.isButton()) {
      isInteractionFromCurrentENV(interaction) &&
        onButtonInteraction(interaction)
    } else if (interaction.isStringSelectMenu()) {
      isInteractionFromCurrentENV(interaction) &&
        onStringSelectMenuInteraction(interaction)
    } else if (interaction.isModalSubmit()) {
      isInteractionFromCurrentENV(interaction) &&
        onModalSubmitInteraction(interaction)
    }
  } catch (error) {
    console.error(
      `🚨Failed interaction (id:${interaction.id}) ${
        interaction?.user.tag ? `by user ${interaction.user.tag}` : ""
      } in channel ${
        interaction.channel && "name" in interaction.channel
          ? interaction.channel.name
          : "unknown"
      }:\n`
    )
    if (error instanceof DiscordAPIError) {
      console.error(
        `\tDiscord API Error: ${error.message.replace(/\n/g, `\n\t`)}`
      )
    } else {
      console.error(`Error: ${error}`)
    }
  }
})

// Start the bot
client.login(BOT_TOKEN)
