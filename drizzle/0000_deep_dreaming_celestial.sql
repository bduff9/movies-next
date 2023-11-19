-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `accounts` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`compound_id` varchar(255) NOT NULL,
	`user_id` int(11) NOT NULL,
	`provider_type` varchar(255) NOT NULL,
	`provider_id` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` text DEFAULT 'NULL',
	`access_token` text DEFAULT 'NULL',
	`access_token_expires` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`created_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`updated_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	CONSTRAINT `uk_compound_id` UNIQUE(`compound_id`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`timestamp` bigint(20) NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`MOVIEID` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`ITEMID` int(10) unsigned DEFAULT 'NULL',
	`MOVIETITLE` varchar(99) DEFAULT 'NULL',
	`MOVIEURL` varchar(99) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `movitems` (
	`ITEMID` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`ORDERED` int(11) DEFAULT 'NULL',
	`ITEMNAME` varchar(99) NOT NULL,
	`ITEMCASE` enum('Plain','Box','Slipcover','Digibook','Steelbook') NOT NULL,
	`ITEMDIGITL` enum('None','DC','UV','DC+UV') NOT NULL DEFAULT ''None'',
	`ITEM3D` enum('Y','N') NOT NULL DEFAULT ''N'',
	`ITEMWATCH` enum('Y','N') NOT NULL DEFAULT ''N'',
	`ITEMFORMAT` enum('Blu-ray','DVD','Ultra HD','UV','Digital') NOT NULL,
	`ITEMSTATUS` enum('Owned','Wanted','Selling','Waiting') NOT NULL,
	`ITEMAVAIL` date DEFAULT 'NULL',
	`ITEMURL` varchar(99) NOT NULL,
	`ITEMNOTES` text DEFAULT 'NULL',
	CONSTRAINT `ORDERED` UNIQUE(`ORDERED`),
	CONSTRAINT `IDX_fd702e539ab7b35cd2338fb3e3` UNIQUE(`ORDERED`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`expires` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`session_token` varchar(255) NOT NULL,
	`access_token` varchar(255) NOT NULL,
	`created_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`updated_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	CONSTRAINT `uk_session_token` UNIQUE(`session_token`),
	CONSTRAINT `uk_access_token` UNIQUE(`access_token`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`email_verified` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`image` varchar(255) DEFAULT 'NULL',
	`created_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`updated_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	CONSTRAINT `uk_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification_requests` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`created_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	`updated_at` timestamp(6) NOT NULL DEFAULT 'current_timestamp(6)',
	CONSTRAINT `uk_token` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE INDEX `idx_provider_account_id` ON `accounts` (`provider_account_id`);--> statement-breakpoint
CREATE INDEX `idx_provider_id` ON `accounts` (`provider_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `ITEMID` ON `movies` (`ITEMID`);--> statement-breakpoint
CREATE INDEX `MOVIETITLE` ON `movies` (`MOVIETITLE`);--> statement-breakpoint
CREATE INDEX `MOVIEURL` ON `movies` (`MOVIEURL`);--> statement-breakpoint
CREATE INDEX `ITEMNAME` ON `movitems` (`ITEMNAME`);--> statement-breakpoint
CREATE INDEX `ITEMCASE` ON `movitems` (`ITEMCASE`);--> statement-breakpoint
CREATE INDEX `ITEMDIGITL` ON `movitems` (`ITEMDIGITL`);--> statement-breakpoint
CREATE INDEX `ITEM3D` ON `movitems` (`ITEM3D`);--> statement-breakpoint
CREATE INDEX `ITEMWATCH` ON `movitems` (`ITEMWATCH`);--> statement-breakpoint
CREATE INDEX `ITEMFORMAT` ON `movitems` (`ITEMFORMAT`);--> statement-breakpoint
CREATE INDEX `ITEMSTATUS` ON `movitems` (`ITEMSTATUS`);--> statement-breakpoint
CREATE INDEX `ITEMAVAIL` ON `movitems` (`ITEMAVAIL`);--> statement-breakpoint
CREATE INDEX `ITEMURL` ON `movitems` (`ITEMURL`);--> statement-breakpoint
ALTER TABLE `movies` ADD CONSTRAINT `FK_e22d334fab8edc4fe78966a43be` FOREIGN KEY (`ITEMID`) REFERENCES `movitems`(`itemid`) ON DELETE cascade ON UPDATE cascade;
*/