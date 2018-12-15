-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 12 2018 г., 10:51
-- Версия сервера: 10.1.37-MariaDB-2.cba
-- Версия PHP: 7.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `cvet0k`
--

-- --------------------------------------------------------

--
-- Структура таблицы `birthdates`
--

CREATE TABLE `birthdates` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '1',
  `peoplename` varchar(255) NOT NULL,
  `birthdate` varchar(10) NOT NULL,
  `dt_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `birthdates`
--

INSERT INTO `birthdates` (`id`, `user_id`, `peoplename`, `birthdate`, `dt_created`, `dt_updated`) VALUES
(88, 1, 'Владимир Ильич Ульянов (псевдоним Ленин)', '22.04.1870', '2018-12-12 10:33:38', '2018-12-12 10:33:38'),
(89, 1, 'Владимир Ильич Ульянов (псевдоним Ленин)', '10.04.1870', '2018-12-12 10:34:42', '2018-12-12 10:34:42'),
(90, 1, 'Иосиф Виссарионович Сталин', '09.12.1879', '2018-12-12 10:37:29', '2018-12-12 10:37:29'),
(91, 1, 'Иосиф Виссарионович Сталин', '21.12.1879', '2018-12-12 10:38:05', '2018-12-12 10:38:05'),
(92, 1, 'Стасик', '16.09.1988', '2018-12-12 10:45:53', '2018-12-12 10:45:53');

-- --------------------------------------------------------

--
-- Структура таблицы `birthdates_tags`
--

CREATE TABLE `birthdates_tags` (
  `id` int(11) NOT NULL,
  `tag` text NOT NULL,
  `people_id` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `birthdates_tags`
--

INSERT INTO `birthdates_tags` (`id`, `tag`, `people_id`) VALUES
(186, 'дата указана по григрианскому календарю', 88),
(187, 'российский революционер', 88),
(188, 'крупный теоретик марксизма', 88),
(189, 'дата указана по юлианскому календарю', 89),
(190, 'российский революционер', 89),
(191, 'крупный теоретик марксизма', 89),
(192, 'настоящая фамилия Джугашвили', 90),
(193, 'дата по официальной версии (указана по юлианскому календарю)', 90),
(194, 'российский революционер', 90),
(195, 'советский политический, государственный, военный и партийный деятель', 90),
(196, 'настоящая фамилия Джугашвили', 91),
(197, 'дата по официальной версии (указана по григорианскому календарю)', 91),
(198, 'российский революционер', 91),
(199, 'советский политический, государственный, военный и партийный деятель', 91),
(200, 'сын маминой подруги', 92);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `dt_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `dt_created`) VALUES
(1, 'user', 'ee11cbb19052e40b07aac0ca060c23ee', '2018-12-02 14:01:24');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `birthdates`
--
ALTER TABLE `birthdates`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `birthdates_tags`
--
ALTER TABLE `birthdates_tags`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `birthdates`
--
ALTER TABLE `birthdates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT для таблицы `birthdates_tags`
--
ALTER TABLE `birthdates_tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
