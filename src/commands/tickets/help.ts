import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} from "discord.js";
import PrefixCommand from "../../structures/classes/PrefixCommand";

export default new PrefixCommand({
  name: "help-ticket",
  run: async ({ message }) => {
    const HELP_EMBED = new EmbedBuilder({
      title: "HELP TICKET SYSTEM",
      description: `Welcome to **${message.guild.name}**. We are glad to have you on board.\nFor any inquiries, please select below accordingly.\n**Full FAQ Below:**  https://bottinghub.com/faqs/`,
      footer: {
        text: "Powered by BottingHub.com",
        iconURL:
          "https://149427301.v2.pressablecdn.com/wp-content/uploads/2021/06/BH2000x2000.png",
      },
    }).setColor("Red");

    const pingButton = new ActionRowBuilder<ButtonBuilder>({
      components: [
        {
          customId: "ping",
          label: "Bot is Online?",
          style: ButtonStyle.Secondary,
          type: ComponentType.Button,
          emoji: "📶",
        },
      ],
    });

    const menu = new ActionRowBuilder<StringSelectMenuBuilder>({
      components: [
        {
          customId: "help",
          options: [
            {
              label: "Bot Manager",
              value: "Bot Manager",
              emoji: "🤖",
              description: "Get help with your Manager",
            },
            {
              label: "Parameters",
              value: "Parameters",
              emoji: "⚙️",
              description: "Get help with the Parameters",
            },
            {
              label: "Proxies",
              value: "Proxies",
              emoji: "🌐",
              description: "Get help with your Proxies",
            },
            {
              label: "Botting Journey",
              value: "Botting Journey",
              emoji: "🥇",
              description:
                "Get help with your Botting Journey VIP Role required",
            },
          ],
          placeholder: "Select an option",
          maxValues: 1,
          type: ComponentType.StringSelect
        },
      ],
    });
    await message.delete();

    message.channel.send({
      embeds: [HELP_EMBED],
      components: [menu, pingButton],
    });
  },
});
