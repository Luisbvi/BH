import { EmbedBuilder } from "discord.js";
import PrefixCommand from "../../structures/classes/PrefixCommand";

export default new PrefixCommand({
  name: "rules",
  run: async ({ message }) => {
    const embed = new EmbedBuilder({
      fields: [
        {
          name: "RULES",
          value:
            "We love a friendly community full of kindness, that is why we have to set rules and guidelines for everyone to follow to ensure a welcoming environment. Challenging these rules and guidelines can result in punishments or complete removal from the community.",
        },
        {
          name: "GENERAL",
          value:
            "➲ 1.1 Forbidden hate speech.\n➲ 1.2 Forbidden political discussions.\n➲ 1.3 Forbidden discrimination.\n➲ 1.4 Forbidden inappropriate words.\n➲ 1.5 Forbidden inappropriate arguments.\n➲ 1.6 Forbidden scamming/exploiting.",
        },
        {
          name: "PROFILE",
          value:
            "➲ 2.1 Forbidden offensive/sexual usernames.\n➲ 2.2 Forbidden gore/sexual profile pictures.\n➲ 2.3 Forbidden gore/sexual banner pictures.\n➲ 2.4 Forbidden non-latin character nicknames.\n➲ 2.5 Forbidden inappropriate bios.\n➲ 2.6 Forbidden inappropriate emojis.",
        },
        {
          name: "SUPPORT",
          value:
            "➲ 3.1 Forbidden to DM staff for support.\n➲ 3.2 Forbidden to DM supporters for leaks.\n➲ 3.3 Forbidden to share harmful script.\n➲ 3.4 Forbidden to share our scripts.",
        },
      ],
    }).setColor("Red");

    await message.channel.send({ embeds: [embed] });

  },
});
