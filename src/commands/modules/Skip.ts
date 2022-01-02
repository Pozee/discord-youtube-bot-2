import { SlashCommandBuilder } from '@discordjs/builders';
import { UserInteraction, YouTubeInterface } from 'bot-classes';
import { ResponseEmojis } from 'bot-config';
import { CommandInteraction } from 'discord.js';
import { BaseCommand } from '../BaseCommand';
import { catchable } from '../decorators/catchable';

export default class Skip implements BaseCommand {
	register() {
		return new SlashCommandBuilder().setName('skip').setDescription('Skip the current audio.');
	}

	@catchable
	async runner(commandInteraction: CommandInteraction) {
		const handler = await new UserInteraction(commandInteraction).init(false);

		handler.voiceChannel;

		const audioInterface = YouTubeInterface.fromGuild(handler.guild);
		const skipped = audioInterface.emitAudioFinish();

		if (skipped) {
			await handler.editWithEmoji('The audio has been skipped.', ResponseEmojis.ArrowRight);
		} else {
			await handler.editWithEmoji('I cannot skip as I am not playing anything!', ResponseEmojis.Danger);
		}
	}
}
