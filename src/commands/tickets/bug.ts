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
  name: "bug-report",
  permissions: ["Administrator"],

  run: async ({ message }) => {
    const HELP_EMBED = new EmbedBuilder({
      title: "BUG REPORT TICKET SYSTEM",
      description: `This channel is for **BUG REPORTS ONLY**. Please provide a detailed explanation of your bug, screenshots and/or recordings and the logs. The scripter will assist you shortly. In the meantime please read our documentation: https://bottinghub.tawk.help/\nPlease react below accordingly.`,
      footer: {
        text: "Powered by BottingHub.com",
        iconURL:
          "https://149427301.v2.pressablecdn.com/wp-content/uploads/2021/06/BH2000x2000.png",
      },
    }).setColor("Red");

    const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>({
      components: [
        new StringSelectMenuBuilder({
          custom_id: "bug",
          options: [
            {
              label: "Tutorial Island",
              value: "Tutorial Island",
              emoji: "<:Gielinor_Guide_chathead:910577796584194100>",
              description: "Bug reports for Tutorial Island",
            },
            {
              label: "AIO Accoun Builder",
              value: "AIO Account Builder",
              emoji: "<:21pxStats_icon:910598640437985321>",
              description: "Bug reports for AIO Account Builder",
            },
            {
              label: "Tithe Farm",
              value: "Tithe Farm",
              emoji: "<:Farming_icon:910580095398322216>",
              description: "Bug reports for Tithe Farm",
            },
            {
              label: "Undead Druids",
              value: "Undead Druids",
              emoji: "<:Undead_Druid:910581037199929405>",
              description: "Bug reports for Undead Druids",
            },
            {
              label: "Elder Chaos",
              value: "Elder Chaos",
              emoji: "<:320pxElder_Chaos_druid:910581834331590696>",
              description: "Bug reports for Elder Chaos",
            },
            {
              label: "Chaos Druid",
              value: "Chaos Druid",
              emoji: "<:320pxChaos_druid:910600566638522368>",
              description: "Bug reports for Chaos Druid",
            },
            {
              label: "Progressive Master Farmer",
              value: "Progressive Master Farmer",
              emoji: "<:Master_Farmer_chathead:910583461981610024>",
              description: "Bug reports for Progressive Master Farmer",
            },
            {
              label: "Firemaking",
              value: "Firemaking",
              emoji: "<:Firemaking:910600716417105940>",
              description: "Bug reports for Firemaking",
            },
            {
              label: "King Black Dragon",
              value: "King Black Dragon",
              emoji: "<:King_Black_Dragon_chathead:949996735420334104>",
              description: "Bug reports for King Black Dragon",
            },
            {
              label: "Sorceress's Garden",
              value: "Sorceress's Garden",
              emoji: "<:Summer_sqirkjuice_detail:949999523793633290>",
              description: "Bug reports for Sorceress's Garden",
            },
            {
              label: "Yew Chopper",
              value: "Yew Chopper",
              emoji: "<:yewlogsosrs:959798334913118238>",
              description: "Bug reports for Yew Chopper",
            },
            {
              label: "Minnow Fisher",
              value: "Minnow Fisher",
              emoji: "<:anglersetosrs:959798681710768128>",
              description: "Bug reports for Minnor Fisher",
            },
            {
              label: "Looter",
              value: "Looter",
              emoji: "<:155pxLooting_bag_detail:959798898333986826>",
              description: "Bug reports for Looter",
            },
            {
              label: "Mage Training Arena",
              value: "Mage Training Arena",
              emoji: "<:Infinity_boots_detail:1000074802238865469>",
              description: "Bug reports for Mage Training Arena",
            },
            {
              label: "Crazy Archy",
              value: "Crazy Archy",
              emoji: "<:Ibanstaff:971813660202795099>",
              description: "Bug reports for Crazy Archy",
            },
            {
              label: "Sarachnis",
              value: "Sarachnis",
              emoji: "<:Sarachnis:1011634229773357076>",
              description: "Bug reports for Sarachnis",
            },
          ],
          placeholder: "Select an option",
          max_values: 1,          
        }),
      ],
    });

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
    message.channel.send({
      embeds: [HELP_EMBED],
      components: [selectMenu, pingButton],
    });
  },
});
