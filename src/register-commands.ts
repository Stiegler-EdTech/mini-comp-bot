import { REST, Routes } from "discord.js"
import { BOT_TOKEN } from "./config"
import dotenv from "dotenv"
import { miniBatchCommand, startCommand } from "./commands/index"

dotenv.config()

const CLIENT_ID = process.env.CLIENT_ID!
const GUILD_ID = process.env.GUILD_ID!

const commands = [
  startCommand.data.toJSON(), // command /start {week #} {competition name}
  miniBatchCommand.data.toJSON(), // command /minibatch {week #} {competition name}
]

const rest = new REST({ version: "10" }).setToken(BOT_TOKEN)

async function registerCommand() {
  try {
    console.log("🔄 Registering slash commands...")
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    console.log("✅ Slash commands registered successfully!")
  } catch (error) {
    console.error("❌ Error registering commands:", error)
  }
}

registerCommand()
