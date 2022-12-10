import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  CommandInteractionOptionResolver,
  ComponentType,
  EmbedBuilder,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
import { client } from "../..";
import { TicketModel } from "../../schema/Tickets";
import { Event } from "../../structures/classes/Event";
import { ExtendedInteraction } from "../../structures/interfaces/SlashCommand";
import { createTranscript } from "discord-html-transcripts";
import { connection } from "mongoose";

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.slashCommand.get(interaction?.commandName);
    if (!command) return;

    if (command.owner) {
      const owners = process.env.owners.split(" ");
      if (!owners.includes(interaction.user.id))
        return interaction.reply({
          content: `:x:**Only the owners can execute this command**\nOwners: ${owners
            .map((owner) => `<@${owner}>`)
            .join(", ")}`,
        });
    }

    if (command.botPermissions) {
      if (!interaction.guild.members.me.permissions.has(command.botPermissions))
        return interaction.reply({
          content: `:x: **I need the following persmissions to execute this command**\n${command.botPermissions
            .map((permission) => `\`${permission}\``)
            .join(", ")}`,
        });
    }

    if (
      command.permission &&
      !interaction.guild.members.cache
        .get(interaction.user.id)
        .permissions.has(command.permission)
    ) {
      await interaction.deferReply({ ephemeral: true });
      return interaction.editReply({
        content: `:x: **You need the following persmissions to execute this command**\n${command.permission
          .map((permission) => `\`${permission}\``)
          .join(", ")}`,
      });
    }

    try {
      command.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as ExtendedInteraction,
      });
    } catch (error) {
      interaction.reply({
        content: `Error while running this command please check the console`,
      });
      console.log(error);
      return;
    }
  }

  if (interaction.isStringSelectMenu()) {
    const { guild, member, customId, guildId } = interaction;
    const { GuildText } = ChannelType;

    const menus = {
      bug: async () => {
        await interaction.deferReply({ ephemeral: true });
        interaction.editReply({ content: "Creating ticket..." });
        const scripterID = {
          "Tutorial Island": "910592815019483136",
          "AIO Account Builder": "855457665505165343",
          "Tithe Farm": "910592986931404850",
          "Undead Druids": "855459315737296916",
          "Elder Chaos": "596195557664489507",
          "Chaos Druid": "910614225334984757",
          "Progressive Master Farmer": "910593028345982976",
          Firemaking: "910614352606941205",
          "King Black Dragon": "950002168235196449",
          "Sorceress's Garden": "596195557664489507",
          "Yew Chopper": "959807796336001054",
          "Minnow Fisher": "959823999838322718",
          Looter: "959807087716728842",
          "Mage Training Arena": "596195557664489507",
          "Crazy Archy": "971813299861721128",
          Sarachnis: "1011635107855085608",
        };

        await guild.channels
          .create({
            name: `ticket-${member.user.username}`,
            type: GuildText,
            parent: "950025744761901077",
            permissionOverwrites: [
              {
                id: member.user.id,
                allow: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.ReadMessageHistory,
                ],
              },
              {
                id: scripterID[interaction.values[0]],
                allow: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.ReadMessageHistory,
                ],
              },
              {
                id: guild.roles.everyone.id,
                deny: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.ReadMessageHistory,
                ],
              },
            ],
          })
          .then(async (channel) => {
            await TicketModel.create({
              channelId: channel.id,
              guildId,
              memberId: member.user.id,
              closed: false,
              locked: false,
              type: customId,
            });

            const EMBED = new EmbedBuilder({
              title: `Welcome to Report System for ${interaction.values[0]}`,
              description:
                "Support will assist you shortly. In the meantime, please check out our main website https://bottinghub.com/",
              footer: {
                text: "Powered by BottingHub.com",
                iconURL:
                  "https://149427301.v2.pressablecdn.com/wp-content/uploads/2021/06/BH2000x2000.png",
              },
            }).setColor("Red");

            const Buttons = new ActionRowBuilder<ButtonBuilder>({
              components: [
                {
                  customId: "close",
                  label: "Close",
                  style: ButtonStyle.Danger,
                  emoji: "🔒",
                  type: ComponentType.Button,
                },
              ],
            });

            channel.send({
              content:
                scripterID[interaction.values[0]] !== "596195557664489507"
                  ? `<@&${scripterID[interaction.values[0]]}> - ${member}`
                  : `<@596195557664489507> - ${member} `,
              embeds: [EMBED],
              components: [Buttons],
            });
            interaction.editReply({
              content: `${member} your ticket has been created: ${channel}`,
            });
          });
      },

      help: async () => {
        await interaction.deferReply({ ephemeral: true });
        interaction.editReply({ content: "Creating ticket..." });
        await guild.channels
          .create({
            name: `ticket-${member.user.username}`,
            type: GuildText,
            parent: process.env.helpTicketParent,
            permissionOverwrites: [
              {
                id: member.user.id,
                allow: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.ReadMessageHistory,
                ],
              },
              {
                id: guild.roles.everyone.id,
                deny: [
                  PermissionFlagsBits.ViewChannel,
                  PermissionFlagsBits.SendMessages,
                  PermissionFlagsBits.ReadMessageHistory,
                ],
              },
            ],
          })
          .then(async (channel) => {
            TicketModel.create({
              channelId: channel.id,
              guildId: guild.id,
              memberId: member.user.id,
              closed: false,
              locked: false,
              type: customId,
            });

            const EMBED = new EmbedBuilder({
              title: "Welcome to Support",
              description: `Type of issue: **${interaction.values[0]}**\n\nSupport will assist you shortly. In the meantime, please check out our main website https://bottinghub.com/`,
            }).setColor("Red");

            const Buttons = new ActionRowBuilder<ButtonBuilder>({
              components: [
                {
                  customId: "close",
                  label: "Close",
                  style: ButtonStyle.Danger,
                  emoji: "🔒",
                  type: ComponentType.Button,
                },
              ],
            });

            channel.send({
              content: `<@&855147692702302219> - ${member}`,
              embeds: [EMBED],
              components: [Buttons],
            });

            interaction.editReply({
              content: `${member} your ticket has been created: ${channel}`,
            });
          });
      },
    };

    menus[customId]
      ? menus[customId]()
      : interaction.reply({ content: "not implemented yet", ephemeral: true });
  }

  if (interaction.isButton()) {
    const { customId, channel, channelId, guild, member } = interaction;
    const buttons = {
      close: async () => {
        const ticket = await TicketModel.findOne({
          channelId: channelId,
        });
        if (!ticket) {
          return interaction.reply({
            content:
              "No data was found related to this ticket, please delete manually.",
            ephemeral: true,
          });
        }

        if (ticket.closed) {
          return interaction.reply({
            embeds: [
              new EmbedBuilder({
                description: "This ticket is already closed",
              }).setColor("White"),
            ],
            ephemeral: true,
          });
        }

        if (channelId === ticket.channelId) {
          interaction.update({});
          channel.send({
            content: "Are you sure you would like to close this ticket?",
            components: [
              new ActionRowBuilder<ButtonBuilder>({
                components: [
                  {
                    customId: "confirm-close",
                    label: "Close",
                    style: ButtonStyle.Danger,
                    type: ComponentType.Button,
                  },
                  {
                    customId: "cancel-close",
                    label: "Cancel",
                    style: ButtonStyle.Secondary,
                    type: ComponentType.Button,
                  },
                ],
              }),
            ],
          });
        }
      },

      "confirm-close": async () => {
        const ticket = await TicketModel.findOne({
          channelId: channelId,
        });

        const closedEmbed = new EmbedBuilder({
          description: `Ticket closed by ${member}`,
        }).setColor("White");

        const channel = guild.channels.cache.get(
          ticket.channelId
        ) as TextChannel;

        interaction.message.delete();

        await channel.send({ embeds: [closedEmbed] });

        channel.edit({
          permissionOverwrites: [
            {
              id: ticket.memberId,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ReadMessageHistory,
              ],
            },
            {
              id: guild.roles.everyone.id,
              deny: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.ReadMessageHistory,
              ],
            },
          ],
        });

        await TicketModel.updateOne(
          { channelId: channel.id },
          { closed: true }
        );

        channel.send({
          embeds: [
            new EmbedBuilder({
              description: "`Support team ticket controls`",
            }).setColor("#36393F"),
          ],
          components: [
            new ActionRowBuilder<ButtonBuilder>({
              components: [
                {
                  customId: "transcript",
                  label: "Transcript",
                  emoji: "🧾",
                  style: ButtonStyle.Secondary,
                  type: ComponentType.Button,
                },
                {
                  customId: "delete",
                  label: "Delete",
                  emoji: "⛔",
                  style: ButtonStyle.Secondary,
                  type: ComponentType.Button,
                },
              ],
            }),
          ],
        });
      },

      "cancel-close": async () => {
        await interaction.update({});
        interaction.message.delete();
      },

      delete: async () => {
        interaction.update({});

        channel.send({
          embeds: [
            new EmbedBuilder({
              description: "Ticket will be deleted in few seconds",
            }).setColor("White"),
          ],
        });

        setTimeout(() => {
          channel.delete();
          TicketModel.deleteOne({ channelId: channelId });
        }, 10000);
      },

      transcript: async () => {
        const ticket = await TicketModel.findOne({
          channelId: channelId,
        });
        interaction.update({});
        const msg = await channel.send({
          embeds: [
            new EmbedBuilder({
              description: "Transcript saving...",
            }).setColor("White"),
          ],
        });

        const transcript = await createTranscript(channel, {
          filename: `transcript-${channel.name}.html`,
          limit: -1,
        });

        const member = guild.members.cache.get(ticket.memberId);

        const transcriptChannel = guild.channels.cache.get(
          process.env.transcriptChannel
        ) as TextChannel;

        const transcriptEmbed = new EmbedBuilder({
          author: {
            name: member.user.tag,
            iconURL: member.user.displayAvatarURL({ forceStatic: false }),
          },
          fields: [
            {
              name: "Ticket Owner",
              value: `${member}`,
              inline: true,
            },
            {
              name: "Ticket Name",
              value: channel.name,
              inline: true,
            },
            {
              name: "Guild Name",
              value: guild.name,
              inline: true,
            },
          ],
        }).setColor("White");

        await channel.send({
          files: [transcript],
          embeds: [transcriptEmbed],
        });

        msg.edit({
          embeds: [
            new EmbedBuilder({
              description: `Transcript saved to ${channel}`,
            }).setColor("White"),
          ],
        });

        member.send({ files: [transcript], embeds: [transcriptEmbed] });
        transcriptChannel.send({
          embeds: [transcriptEmbed],
          files: [transcript],
        });
      },

      ping: async () => {
        const status = [
          "Disconnected",
          "Connected",
          "Connecting",
          "Disconnecting",
        ];
        await interaction.client.user.fetch();
        await interaction.client.application.fetch();
        const embed = new EmbedBuilder({
          title: `${interaction.client.user.username}'s status`,
          thumbnail: {
            url: interaction.client.user.displayAvatarURL({ size: 1024 }),
          },
          fields: [
            {
              name: "System",
              value: [
                `⏰ **Up Since** <t:${parseInt(
                  (interaction.client.readyTimestamp / 1000).toFixed(0)
                )}:R>`,
                `🏓 **Ping** ${interaction.client.ws.ping}ms`,
                `📚 **Database** ${status[connection.readyState]}`,
              ].join("\n"),
              inline: true,
            },
          ],
        }).setColor(interaction.guild.members.me.roles.highest.hexColor);
        interaction.reply({ embeds: [embed], ephemeral: true });
      },
    };

    buttons[customId]
      ? buttons[customId]()
      : interaction.editReply({
          content: ":x: This button isn't implemented yet",
        });
  }
});
