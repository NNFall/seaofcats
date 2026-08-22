import type { ImageMetadata } from 'astro';

import catBlackWhite from '../assets/images/venue/cat-black-white.webp';
import catBridge from '../assets/images/venue/cat-bridge.webp';
import catChair from '../assets/images/venue/cat-chair.webp';
import catHouse from '../assets/images/venue/cat-house.webp';
import catWindow from '../assets/images/venue/cat-window.webp';
import facade from '../assets/images/venue/facade.webp';
import facadeLogo from '../assets/images/venue/facade-logo.webp';
import groupCats from '../assets/images/venue/group-cats.webp';
import heroCat from '../assets/images/venue/hero-cat.webp';
import interiorBench from '../assets/images/venue/interior-bench.webp';
import interiorVisitor from '../assets/images/venue/interior-visitor.webp';
import sleepingCat from '../assets/images/venue/sleeping-cat.webp';
import teaStation from '../assets/images/venue/tea-station.webp';
import teaTable from '../assets/images/venue/tea-table.webp';
import visitorsStairs from '../assets/images/venue/visitors-stairs.webp';

export interface GalleryItem {
	id: string;
	src: ImageMetadata;
	alt: string;
	caption: string;
}

export const links = {
	vk: 'https://vk.ru/club233883954',
	max: 'https://max.ru/u/f9LHodD0cOIOSaX4KAQ_CBVFRgvaZvaD_L17fsowg6he_oanH9lVQxSGXcY',
	route: 'https://yandex.ru/maps/-/CTwNq86O',
	maps: 'https://yandex.ru/maps/org/more_kotikov/137591097049/',
} as const;

export const business = {
	name: 'Море Котиков',
	format: 'Котокафе-антикафе',
	description:
		'Тихое котокафе-антикафе в Самаре, где можно провести время с котиками, выпить чаю и отдохнуть.',
	address: {
		display: 'Самара, Дыбенко 33А',
		streetAddress: 'улица Дыбенко, 33А',
		addressLocality: 'Самара',
		addressCountry: 'RU',
	},
	phone: {
		display: '+7 902 299-55-43',
		href: 'tel:+79022995543',
	},
} as const;

export const hours = {
	summary: 'Пн — закрыто · Вт–Вс 13:00–20:00',
	closedNote: 'Понедельник — выходной',
	sourceCheckedAt: '2026-08-23',
	schedule: [
		{
			label: 'Понедельник',
			days: ['Monday'],
			closed: true,
		},
		{
			label: 'Вторник–воскресенье',
			days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			opens: '13:00',
			closes: '20:00',
			closed: false,
		},
	],
} as const;

export const prices = {
	status: 'confirm-before-visit',
	note: 'Актуальную стоимость посещения уточняйте перед визитом — в VK или по телефону.',
} as const;

export const navigation = [
	{ href: '#about', label: 'О нас' },
	{ href: '#cats', label: 'Котики' },
	{ href: '#inside', label: 'Внутри' },
	{ href: '#visit', label: 'Перед визитом' },
	{ href: '#contact', label: 'Контакты' },
] as const;

export const seo = {
	title: 'Море Котиков — котокафе-антикафе в Самаре',
	description:
		'Котокафе-антикафе «Море Котиков» в Самаре: реальные фотографии, правила посещения, часы работы и контакты. Дыбенко, 33А.',
} as const;

export const gallery = [
	{
		id: 'hero',
		src: heroCat,
		alt: 'Полосатый кот смотрит в камеру с площадки игрового дерева',
		caption: 'Любопытный кот на игровом дереве',
	},
	{
		id: 'cat-black-white',
		src: catBlackWhite,
		alt: 'Черно-белый кот с зелеными глазами крупным планом',
		caption: 'Черно-белый кот у окна',
	},
	{
		id: 'cat-bridge',
		src: catBridge,
		alt: 'Полосатый кот сидит на подвесном деревянном мостике под потолком',
		caption: 'Кот на подвесном мостике',
	},
	{
		id: 'cat-chair',
		src: catChair,
		alt: 'Бело-серый кот лежит на стуле рядом со столом и книжным стеллажом',
		caption: 'Кот выбрал свободный стул',
	},
	{
		id: 'cat-house',
		src: catHouse,
		alt: 'Полосатый кот выглядывает из мягкого домика с кошачьими ушками',
		caption: 'Кот в мягком домике',
	},
	{
		id: 'cat-window',
		src: catWindow,
		alt: 'Полосатый кот лежит в красной лежанке со звездами у большого окна',
		caption: 'Кот отдыхает у окна',
	},
	{
		id: 'sleeping-cat',
		src: sleepingCat,
		alt: 'Полосатый кот дремлет на желтом кресле',
		caption: 'Тихий час на кресле',
	},
	{
		id: 'group-cats',
		src: groupCats,
		alt: 'Сотрудница гладит одного из четырех котов в светлом зале котокафе',
		caption: 'Котики в зале у входа',
	},
	{
		id: 'interior-bench',
		src: interiorBench,
		alt: 'Светлый зал с белой скамьей, красным столиком и кошачьим деревом',
		caption: 'Зал с местами для отдыха',
	},
	{
		id: 'interior-visitor',
		src: interiorVisitor,
		alt: 'Посетительница держит кота за столиком рядом с большим окном',
		caption: 'Время с котиками у окна',
	},
	{
		id: 'visitors-stairs',
		src: visitorsStairs,
		alt: 'Двое посетителей гладят кота на красной лестнице в зале',
		caption: 'Гости и кот на лестнице',
	},
	{
		id: 'tea-station',
		src: teaStation,
		alt: 'Чайная зона с кружками, чайником, чаем и небольшими угощениями',
		caption: 'Чайная зона для гостей',
	},
	{
		id: 'tea-table',
		src: teaTable,
		alt: 'Чайник, кружка чая и печенье на деревянном столе',
		caption: 'Чай и угощения за общим столом',
	},
	{
		id: 'facade',
		src: facade,
		alt: 'Красный фасад здания котокафе «Море Котиков» в Самаре',
		caption: 'Фасад котокафе на улице Дыбенко',
	},
	{
		id: 'facade-logo',
		src: facadeLogo,
		alt: 'Вывески «Котокафе» и «Море Котиков» на красном фасаде здания',
		caption: 'Вывеска поможет узнать вход',
	},
] as const satisfies readonly GalleryItem[];

const catGalleryIds = new Set([
	'hero',
	'cat-black-white',
	'cat-bridge',
	'cat-chair',
	'cat-house',
	'cat-window',
	'sleeping-cat',
]);

export const cats = gallery.filter((item) => catGalleryIds.has(item.id));

export const siteData = {
	business,
	links,
	hours,
	prices,
	navigation,
	seo,
	gallery,
	cats,
} as const;

export const site = siteData;

export default siteData;
