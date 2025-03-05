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
import { BOT_TOKEN, GUILD_ID } from "./config"
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

client.on("interactionCreate", async (interaction: Interaction) => {
  if (interaction.guildId !== GUILD_ID) {
    // Ignore interactions that are not from/to the bot sending the message (testing vs prod)
    return
  }

  try {
    if (interaction.isChatInputCommand()) {
      const command = commands.get(interaction.commandName)
      if (!command) {
        console.warn(`⚠️ Unknown command: ${interaction.commandName}`)
        return
      }

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
      await onButtonInteraction(interaction)
    } else if (interaction.isStringSelectMenu()) {
      await onStringSelectMenuInteraction(interaction)
    } else if (interaction.isModalSubmit()) {
      await onModalSubmitInteraction(interaction)
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
